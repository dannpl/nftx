import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'
import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { ATA_PROGRAM_ID } from './constants'

export const encodeString = (value: string): number[] => {
  const buffer = Buffer.alloc(32)
  buffer.fill(value)
  buffer.fill(' ', value.length)

  return Array(...buffer)
}

export const decodeString = (bytes: number[]): string => {
  const buffer = Buffer.from(bytes)
  return buffer.toString('utf8').trim()
}

export const getVaultAddressSync = (
  programId: PublicKey,
  vaultName: string
) => {
  const [StakeVaultPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from('vault'), Buffer.from(vaultName)],
    programId
  )

  return StakeVaultPDA
}

export const getStakeAddressSync = (programId: PublicKey, nftName: string) => {
  const [StakePDA] = PublicKey.findProgramAddressSync(
    [Buffer.from('stake'), Buffer.from(nftName)],
    programId
  )

  return StakePDA
}

export const getMintAddressSync = (programId: PublicKey, nft: string) => {
  const [mint] = PublicKey.findProgramAddressSync(
    [Buffer.from('mint'), Buffer.from(nft)],
    programId
  )

  return mint
}

export const getCollectionAddressSync = (
  programId: PublicKey,
  collectionName: string
) => {
  const [CollectionPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from('collection'), Buffer.from(collectionName)],
    programId
  )

  return CollectionPDA
}

export const getATASync = (address: PublicKey, Mint: PublicKey) => {
  const [ATA] = PublicKey.findProgramAddressSync(
    [address.toBytes(), TOKEN_2022_PROGRAM_ID.toBytes(), Mint.toBytes()],
    new PublicKey(ATA_PROGRAM_ID)
  )

  return ATA
}

export const formatNumber = (number: bigint | BN, decimals = 6) => {
  return Number(number.toString()) / 10 ** decimals
}
