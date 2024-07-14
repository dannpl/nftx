use anchor_lang::prelude::*;

mod errors;
mod instructions;
mod state;

declare_id!("Fb4qrJcT6BzESLcqHk8NPKTdVYddri6DaMr8kN1qPvhz");

#[program]
pub mod nftx {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
