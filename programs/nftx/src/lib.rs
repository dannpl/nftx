use anchor_lang::prelude::*;
use instructions::*;
use state::*;

mod constants;
mod errors;
mod instructions;
mod state;

declare_id!("BGQFcsJJopkMEXHP3hLcad4dpKRbPUvh5utMA4932HxF");

#[program]
pub mod nftx {
    use super::*;

    pub fn initialize_collection(
        ctx: Context<InitializeCollection>,
        args: InitializeCollectionArgs,
    ) -> Result<()> {
        instructions::initialize_collection(ctx, args)
    }

    pub fn mint_nft(ctx: Context<MintNft>, args: MintNftArgs) -> Result<()> {
        instructions::mint_nft(ctx, args)
    }

    pub fn swap(ctx: Context<Swap>) -> Result<()> {
        instructions::swap(ctx)
    }

    pub fn initialize_vault(
        ctx: Context<InitializeVault>,
        args: InitializeVaultArgs,
    ) -> Result<()> {
        instructions::initialize_vault(ctx, args)
    }

    pub fn stake_nft(ctx: Context<StakeNFT>, args: StakeNFTArgs) -> Result<()> {
        instructions::stake_nft(ctx, args)
    }

    pub fn unstake_nft(ctx: Context<UnstakeNFT>, args: UnstakeNFTArgs) -> Result<()> {
        instructions::unstake_nft(ctx, args)
    }
}
