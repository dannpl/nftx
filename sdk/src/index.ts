import { AnchorProvider, BN, Program, Wallet } from '@coral-xyz/anchor'
import { Nftx } from './types/nftx'
import IDL from './types/idl_nftx.json'
import { ComputeBudgetProgram, Connection, PublicKey } from '@solana/web3.js'
import { RpcOptions } from './types'
import {
  getATASync,
  getCollectionAddressSync,
  getMintAddressSync,
  getVaultAddressSync
} from './utils/helpers'

export default class NFTx {
  provider: AnchorProvider
  program: Program<Nftx>

  constructor(connection: Connection, wallet: Wallet) {
    this.provider = new AnchorProvider(
      connection,
      wallet,
      AnchorProvider.defaultOptions()
    )

    this.program = new Program<Nftx>(IDL as Nftx, this.provider)
  }

  /**
   *  Initialize Collection
   *  @param name - The collection name
   *  @param supply - The total supply of the collection
   *  @param symbol - The collection symbol
   *  @param tresuaryAccount - The tresuary account
   *  @param price - The price of the collection
   *
   */
  public async initializeCollection(
    {
      name,
      supply,
      symbol,
      tresuaryAccount,
      price
    }: {
      name: string
      supply: number
      symbol: string
      tresuaryAccount: PublicKey
      price: BN
    },
    options?: RpcOptions
  ) {
    const method = this.program.methods
      .initializeCollection({
        name,
        supply,
        symbol,
        tresuaryAccount,
        price
      })
      .accounts({
        signer: this.provider.wallet.publicKey
      })

    if (options?.microLamports) {
      method.postInstructions([
        ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: options.microLamports
        })
      ])
    }

    return method.rpc({ skipPreflight: options?.skipPreflight })
  }

  /**
   *  Mint NFT
   *  @param name - NFT name
   *  @param wallet - User wallet
   *  @param uri - NFT uri
   *
   */
  public async mintNft(
    {
      name,
      wallet,
      uri,
      treasury,
      collection
    }: {
      name: string
      wallet: PublicKey
      uri: string
      collection: PublicKey
      treasury: PublicKey
    },
    options?: RpcOptions
  ) {
    const Mint = getMintAddressSync(this.program.programId, name)
    const PayerAta = getATASync(wallet, Mint)

    const method = this.program.methods
      .mintNft({
        name,
        uri
      })
      .accounts({
        signer: wallet,
        treasuryAccount: treasury,
        collection,
        payerAta: PayerAta
      })

    if (options?.microLamports) {
      method.postInstructions([
        ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: options.microLamports
        })
      ])
    }

    return method.rpc({ skipPreflight: options?.skipPreflight })
  }

  /**
   *  Swap
   *  @param name - NFT name
   *  @param wallet - User wallet
   *  @param uri - NFT uri
   *
   */
  swap = async (
    {
      wallet,
      mint,
      collection,
      treasuryAccount
    }: {
      wallet: PublicKey
      mint: PublicKey
      collection: PublicKey
      treasuryAccount: PublicKey
    },
    options?: RpcOptions
  ) => {
    const NftToATA = getATASync(wallet, mint)
    const NftFromATA = getATASync(collection, mint)

    const method = this.program.methods.swap().accounts({
      collection: collection,
      nftFromAta: NftFromATA,
      nftMint: mint,
      nftToAta: NftToATA,
      signer: wallet,
      treasuryAccount: treasuryAccount
    })

    if (options?.microLamports) {
      method.postInstructions([
        ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: options.microLamports
        })
      ])
    }

    return method.rpc({ skipPreflight: options?.skipPreflight })
  }

  /**
   *  Initialize Vault
   *  @param name - The vault name
   *  @param collection - The Collection pubkey
   *
   */
  public async initializeVault(
    {
      name,
      collection
    }: {
      name: string
      collection: PublicKey
    },
    options?: RpcOptions
  ) {
    const method = this.program.methods
      .initializeVault({
        name
      })
      .accounts({
        collection,
        signer: this.provider.wallet.publicKey
      })

    if (options?.microLamports) {
      method.postInstructions([
        ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: options.microLamports
        })
      ])
    }

    return method.rpc({ skipPreflight: options?.skipPreflight })
  }

  /**
   *  Stake NFT
   *  @param name - NFT name
   *  @param wallet - User wallet
   *  @param mint - NFT mint
   *
   */
  public async stake(
    {
      name,
      wallet,
      mint,
      vault
    }: {
      name: string
      wallet: PublicKey
      mint: PublicKey
      vault: string
    },
    options?: RpcOptions
  ) {
    const FromAta = getATASync(wallet, mint)
    const Vault = getVaultAddressSync(this.program.programId, vault)
    const ToAta = getATASync(Vault, mint)

    const method = this.program.methods
      .stakeNft({
        nftName: name,
        vault
      })
      .accounts({
        signer: wallet,
        fromAta: FromAta,
        toAta: ToAta,
        mint: mint
      })

    if (options?.microLamports) {
      method.postInstructions([
        ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: options.microLamports
        })
      ])
    }

    return method.rpc({ skipPreflight: options?.skipPreflight })
  }

  /**
   *  Withdraw NFT
   *  @param wallet - User wallet
   *  @param nftName - NFT name
   *  @param mint - NFT mint
   *  @param vault - Name of the stake vault
   *  @param refund - Refund account
   *  @param collectionName - Collection name
   *
   */
  public async unstake(
    {
      wallet,
      nftName,
      mint,
      vault,
      refund,
      collectionName
    }: {
      wallet: PublicKey
      nftName: string
      mint: PublicKey
      vault: string
      refund: PublicKey
      collectionName: string
    },
    options?: RpcOptions
  ) {
    const Vault = getVaultAddressSync(this.program.programId, vault)

    const FromAta = getATASync(Vault, mint)
    const ToAta = getATASync(wallet, mint)
    const Collection = getCollectionAddressSync(
      this.program.programId,
      collectionName
    )

    const method = this.program.methods
      .unstakeNft({
        nftName,
        vault
      })
      .accounts({
        signer: wallet,
        fromAta: FromAta,
        toAta: ToAta,
        refund,
        mint: mint,
        collection: Collection
      })

    if (options?.microLamports) {
      method.postInstructions([
        ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: options.microLamports
        })
      ])
    }

    return method.rpc({ skipPreflight: options?.skipPreflight })
  }
}
