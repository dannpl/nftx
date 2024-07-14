use anchor_lang::prelude::*;

#[account]
pub struct Vault {
    pub bump: u8,
    pub authority: Pubkey,
    pub init_ts: i64,
    pub amount_users: u64,
    pub name: String,
    pub collection: Pubkey,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct InitializeVaultArgs {
    pub name: String,
    pub collection: Pubkey,
}

impl Vault {
    pub const PREFIX_SEED: &'static [u8] = b"vault";

    pub const SPACE: usize = 8 + std::mem::size_of::<Self>();
}
