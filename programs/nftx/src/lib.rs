use anchor_lang::prelude::*;
use instructions::*;
use state::*;

mod errors;
mod instructions;
mod state;

declare_id!("Fb4qrJcT6BzESLcqHk8NPKTdVYddri6DaMr8kN1qPvhz");

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
}
