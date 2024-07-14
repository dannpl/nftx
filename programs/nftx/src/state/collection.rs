use anchor_lang::prelude::*;

#[account]
pub struct Collection {
    pub init_ts: i64,
    pub name: String,
    pub authority: Pubkey,
    pub symbol: String,
    pub supply: u32,
    pub minteds: u32,
    pub price: u64,
    pub bump: u8,
    pub tresuary_account: Pubkey,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct InitializeCollectionArgs {
    pub name: String,
    pub supply: u32,
    pub symbol: String,
    pub tresuary_account: Pubkey,
    pub price: u64,
}

impl Collection {
    pub const PREFIX_SEED: &'static [u8] = b"collection";

    pub const SPACE: usize = 8 + std::mem::size_of::<Self>();
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct MintNftArgs {
    pub name: String,
    pub uri: String,
}
