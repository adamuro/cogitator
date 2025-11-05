export const weaponNames = [
	"Assault Cannon",
	"Boltgun",
	"Chainsword",
	"Heavy Bolter",
	"Laspistol",
	"Plasma Gun",
	"Power Fist",
	"Power Sword",
	"Shotgun",
	"Sniper Rifle",
	"Storm Bolter",
	"Twin Linked Bolter",
	"Vindicator",
	"Whirlwind",
	"Autocannon",
	"Meltagun",
	"Flamer",
	"Grenade Launcher",
	"Rocket Launcher",
	"Thunder Hammer",
	"Power Maul",
	"Bionic Arm",
	"Combat Knife",
	"Frag Grenade",
	"Krak Grenade",
	"Photon Grenade",
	"Melta Bomb",
	"Demonfire",
	"Inferno Bolt",
	"Hellfire Round",
];

export function randomWeaponName() {
	const index = Math.floor(Math.random() * weaponNames.length);
	const name = weaponNames[index];
	if (!name) throw new Error("Failed to select a random weapon name");

	return name;
}
