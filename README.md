# IPFS-Arweave-Bridge for the bounty --> https://gitcoin.co/issue/ArweaveTeam/Bounties/17/3699
A User Interactive IPFS-Arweave Bridge by which you can upload ipfs objects to Arweave the Permaweb.

Description:

Currently there is no interactive UI Interface present for the users to sent their ipfs data on to Arweave, I have tried to solve this issue by developing a very basic ui interface where you get IPFS data generated for your files & simply send it to arweave by just a simple button click:)

If you want you can also query the transaction done by just providing the hash of the file, by clicking the "Get data" option in the navbar:)


I have used the ipfs-api --> https://www.npmjs.com/package/ipfs-http-client for setting up a ipfs client to do the ipfs related operations & I have used the arweave sdk for arweave related operations.

You start of by cloning the repo, run npm install to download all the necessary modules etc. & run npm start 

Navigate to http://localhost:3000 & you will be able to see a UI Interface.

Workflow:

1. Click on upload wallet to get your arweave browser extension wallet address, you would be notified when the wallet is loaded.
2. Upload the file to IPFS by selecting it & clicking on submit you will seee the hash displayed & you'll see the response code from the transaction to ipfs:)
3.To view your data, just click on Get Data on the navigation bar, enter your hash there & boon you would be able to see the file data in the form of a buffer:)

I have commited all the final changes, if there are any queries do let me know.

FYI - I am not a UI Design Person:)

UI Endpoints --> http://localhost:3000 & http://localhost:3000/data
