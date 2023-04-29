The CAW Manifesto:

A Manifesto on a Decentralized Social Clearing House ...(AKA) CAW

The concept of decentralization has been lost to some of us over time,
those who forgot why Bitcoin was created, the issues blockchain and cryptocurrency is meant to solve.
To be decentralized means there is no single person, entity, nor group which has ultimate control nor
benefit over a system/

In a decentralized system, there is not one man who via desire or persuasion could cripple the system in any meaningful way
This means from both a technical standpoint (i.e, a developer who can stop trading, or disable the protocol through the use of smart contracts)
and a financial one (e.g, an entity who has n+1 (infinite) tokens, and could dump them if they so wished, but decides not to.)

That is not to say that a proper decentralized system is without whales nor its own cornerstones.
There are always those that may have a greater affect upon a network, or 'matter' through entropy or their own hard work.

CAW began as nothing, there was no developer, no information, no medium of communication. Simply. a contract.

Freedom given to the people to discover CAW's meaning amongst themselves. This has gone well,
and so we would like to present our specification for the second phase of CAW. But before we do,
some things must be said and taken note of:
1. This is a only a specification. It is up to the cawmmunity to write and deploy the protocol.
2. It is strongly recommended that a peer group is formed to develop and review smart contracts.
   as there is no leader in this process, all types will attempt to claim ownership of the process.
   there will those everso helpful who claim to be able to 'do it all' but will write the perfect code
   with the perfect backdoor Only a cawmmunity reviewed and accepted contract on a public github will be acceptable
3. After deployment, the deployer must renounce any keys they have to the contracts. There will be no multi-sig, no upgradeable proxyies.
   It will not matter who deployed because they will be equal with all with no specfic benefit nor advantage. Just get the contract right.

We propose:

a. A protocol made up of many on-chain smart contracts for sending messages publically or p2p with a max character limit of 420.
b. A specification for the frontends, of which many will be made, to interact with this protocol.
The general function of the protocol and its contracts is as follows:

i. Burn CAW through a contract to mint an NFT. This burned caw will go to 0x0. The NFT will be your username.
a. The fewer characters in your username, the higher the cost.
b. Every username is unique, and may use a-z and 0-9, without the use of special characters (emojis, etc..,) or capital letters.

ii. All user activity, social and financial flows through their NFT username. Whoever owns this NFT has access to that account.
This includes, but is not limited to, their CAW balance and access to that user's direct messages (DMs).

iii. Ownership and management of the NFTs will be completely on-chain. For instance, the registration of the username 'cawdev'
will be stored directly on-chain, along with all of the data associated.

iv. Holding the NFT (note holding, not staking), allows the user to deposit or withdraw CAW into a contract wallet.
The ownership of the NFT will serve as the key to this wallet. For users using multiple NFTs they may specify which by a unique number associated.

v. A user may spend CAW in the following way on the protocol.

i. Making a CAW (Akin to tweeting).
a. This cost will be taken in CAW, and then distributed proportionally to all other stakers.
ii. Liking someone else's CAW.
a. This is closer to tipping. The CAW will be taken and directly sent to the OP (orginal poster's) wallet.

iii. ReCAWing (akin to a retweet).
a. The cost of which will be taken in CAW and sent to OP's wallet.


vi. For receiving the CAW we envision a mostly gasless contract, in which signatures may push CAW balance between users and the application in a contract.
The only thing a user should be spending gas on is:
a. The minting of an NFT.
b. Depositing or withdrawing CAW.
vii. DM's should be 'free' and executed via a trustless handshake between two accounts to enable secure peer-to-peer messaging.
Group chats would bring on unneeded complexity, and are not recommended at this point.

viii. All data will be stored permanently. Due to limitations of the Ethereum network, Arweave or similar blockchains may be preferred. The CAW liquidty
may migrate at somepoint to the QOMQQL1, but that will be addressed once the technical merits reveal itself and the move is obvious.

Data storage must be completely trustless, and permanent. The importance of being both censorship resistant and self-policing for the betterment
of a protocol cannot be overstated. CAW is meant only to give you the raw tool kit to build your own online society.
Because of this, there is a distinct gap between the protocol itself, and the frontends.

At the base level, CAW's contracts for trustless data storage and communication, anything can be posted. We are not naive, and we understand what may be posted.
As a result of this, it is up to the frontends to limit content that might obfuscate the reason for CAW's creation.

That being said, at the level of a protocol no username or message will be blocked or quarantined.
Due to the nature of renounced ownership of smart contracts, there will be nobody who can limit such content.
(perhaps now you see why renouceing the contract with no multi-sig or upgrades is important.)

Now onto the frontends. Anybody is free to make or host their own frontend which will show whatever they woud like (or don't).
we expect there will be many along with a goal of a mobile app and browser extension that serves as cawing/wallet and instant messager platform that executes
the sigs fast and invisible to give a smoother messaging experience (signing a metamask everytime can be tiresome)

We would recommend that the community makes an alpha frontend, that is more or less 'neutral'.
It may filter overt hate/violence, along with hard-illegal activity, remember we need to win the world first.
Others may have a better idea of what should be shown, and their perogative should be to create and host their own frontend.
The point being, CAW is like Twitter. Except it is bound by no laws, and no central content moderation.
However, the frontends may choose to moderate the content however they like, or must to fit whatever legal guidelines they need to fit.

So even if one frontend blocks you, you cannot be policed, and are still free to use the protocol itself.

Appendix.

a. It is fairly obvious individuals will begin buying and selling the NFT usernames.
It would be wise of a community member to create a trustless and feeless marketplace for such trades, similar to Crypto Punk feeless trades
That being said we are pretty aware that as CAW grows to scale, many will still use FEE marketplaces such as opensea and looks.
This means that the deployer of the contract that mints NFTS will have the technical ability to set themselves fee's from opensea.
We do not think this is a good thing, and ask the cammunity to self police/renounce in order to
make sure that trading fees are not set and sent to a private wallet.
If it helps, this will imply liabilty for the content posted if your wallet is recieving trading fees

b. Economically, these are the numbers open for debate and structured so that we understand the practical dollar amount of CAW.

i. 50 mln market cap (near or current MC).
ii. 1 bln market cap (typical memecoin mooning for a bit MC).
iii. 10 bln market cap (SHIB-like).
We will need to be aware of the realities of what happens as the burn of CAW scales,
as we will not be able to change the cost of the protocol once set in motion.

The necessary cost calculations in CAW are:

i. Amount of CAW to send CAW (all of which is distributed among stakers).
ii. Amount of CAW to like a CAW. (sent to OP).
iii. Amount of CAW to reCAW a CAW (distributed amount OP and stakers).
viv. Burn amounts for various length'd username NFTs.

We did quite a bit of math to consider the following numbers, but we may have missed something.
It was calculated in such a way that liking, reCAWing, and posting, is always affordable at a market cap of 10 billion,
while ensuring that the more rare and shorter usernames remain damn expensive.

The following is the recommended cost, along with the estimated amount in US Dollars in brackets at the three target MC's (50 mln, 1 bln, 10 bln).

- Single Character username (rare!) BURN 1,000,000,000,000 ($89,985, $1,799,712, $17,997,120)
- 2 Character username - BURN 240,000,000,000 CAW ($21,600, $432,000, $4,320,000)
- 3 Character Username - BURN 60,000,000,000 CAW ($5400, $108,000, $1,080,000)
- 4 Character Username - BURN 6,000,000,000 CAW ($540, $10,800 $108,000)
- 5 Character username - BURN 200,000,000 CAW ($18, $360, $3600)
- 6 Character username - BURN 20,000,000 CAW ($1.80, $36, $360)
- 7 Character username -BURN 10,000,000 CAW (90c, $18, $180)

- 8 Character and up username - BURN 1,000,000 CAW (9c, $1.80, $18)

- Follow an Account (paid 80/20 to account and stakepool) 30000 (na,0.009,9c)
- Send a CAW (max xxx Characters) (paid 100 to stakepool) 5000 (na, na, 1.5c)
- Like a CAW (paid 80/20 to account and stakepool) 2000 (na,na, $0.007)
- ReCAW (paid 50/50 to account and stakepool) 4000 (na,na,1.2c)

c. Image hosting, and managemement.

i. The protocol will have no involvement in the hosting of images. This will be up to the frontends to filter,display,host.
ii. It is recommended that frontends render URLs from external sources placed inside posts,
or employ their own URL shortener so URLs do not destroy the character limit on CAW.

For example if my CAW was ... "Just had some great fried fish on Point Road with @tk420 #yum #foodie #bestfrens https://savoryandsweetfood.com/wp-content/uploads/2013/10/
20131020-164849.jpg"

A frontend should shorten the URL to something like 'https://c.aw/cawdev' prior to the users post, and automically render the URL as a snippet.

Love, one who still dreams.

P.S. There are no official socials, nor partner projects or further releases.
CAW is by design without design, and it is up the CAWMmunity to shape CAW.
Only by giving you the vision and seeing what cames next may we have a truly free and decentralized system.
