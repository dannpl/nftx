use anchor_lang::prelude::*;

#[account]
pub struct Stake {
    pub bump: u8,
    pub authority: Pubkey,
    pub init_ts: i64,
    pub nft_name: String,
    pub mint: Pubkey,
    pub vault: Pubkey,
    pub points: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct StakeNFTArgs {
    pub nft_name: String,
    pub vault: String,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct UnstakeNFTArgs {
    pub vault: String,
    pub nft_name: String,
}

impl Stake {
    pub const PREFIX_SEED: &'static [u8] = b"stake";

    pub const SPACE: usize = 8 + std::mem::size_of::<Self>();
}
