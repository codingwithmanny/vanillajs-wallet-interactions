// Constants
// ========================================================
/**
 * Used to toggle mobile menu
 */
let IS_MENU_OPEN = false;

/**
 * Used to define throughout the app if the browser
 * has support for window.ethereum
 */
let IS_BROWSER_SUPPORTED = false;

/**
 * 
 */
let IS_CONNECTED = false;


/**
 * Wallet address that is connected
 */
let ACCOUNT_CONNECTED = null;

/**
 * 
 */
let WALLET_PERMISSION;

/**
 * 
 */
let CHAIN;

/**
 * 
 */
let CHAIN_NAME;

/**
 * 
 */
const CHAIN_DICTIONARY = {
    1: 'Ethereum Mainnet',
    5: 'Goerli Testnet',
    137: 'Polygon Mainnet',
    1337: 'Localhost',
    1402: 'zkEVM Testnet',
    80001: 'Mumbai Testnet',
    11155111: 'Sepolia Testnet'
};

/**
 * 
 */
const BLOCKCHAIN_EXPLORERS = {
    1: 'https://etherscan.io',
    5: 'https://goerli.etherscan.io',
    137: 'https://polygonscan.com',
    1337: null,
    1402: 'https://explorer.public.zkevm-test.net',
    80001: 'https://mumbai.polygonscan.com',
    11155111: 'https://sepolia.etherscan.io',
};

/**
 * 
 */
const CHAIN_MAINNETS = [1, 137];

/**
 * 
 */
const CHAIN_LOCAL = [1337];

/**
 * Same contract deployed to each network
 */
const CONTRACT_ON_CHAINS = {
    1: '0x76460E73eadE1DDe315E07a5eCa092448c193a2F',
    5: '0x3aC587078b344a3d27e56632dFf236F1Aff04D56',
    137: '0x375F01b156D9BdDDd41fd38c5CC74C514CB71f73',
    1337: '',
    1402: '0x76460E73eadE1DDe315E07a5eCa092448c193a2F',
    80001: '0x7Bd54062eFa363A97dC20f404825597455E93582',
    11155111: '0x375f01b156d9bdddd41fd38c5cc74c514cb71f73',
};

/**
 * ABI needed to interpret how to interact with the contract
 */
const CONTRACT_ABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            }
        ],
        "name": "NewGreeting",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "getGreeting",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

/**
 * 
 */
const CONTRACT_BYTECODE = "0x60806040523480156200001157600080fd5b5060405162000da238038062000da283398181016040528101906200003791906200021e565b8060009081620000489190620004ba565b507fcbc299eeb7a1a982d3674880645107c4fe48c3227163794e48540a752272235433826040516200007c92919062000638565b60405180910390a1506200066c565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620000f482620000a9565b810181811067ffffffffffffffff82111715620001165762000115620000ba565b5b80604052505050565b60006200012b6200008b565b9050620001398282620000e9565b919050565b600067ffffffffffffffff8211156200015c576200015b620000ba565b5b6200016782620000a9565b9050602081019050919050565b60005b838110156200019457808201518184015260208101905062000177565b60008484015250505050565b6000620001b7620001b1846200013e565b6200011f565b905082815260208101848484011115620001d657620001d5620000a4565b5b620001e384828562000174565b509392505050565b600082601f8301126200020357620002026200009f565b5b815162000215848260208601620001a0565b91505092915050565b60006020828403121562000237576200023662000095565b5b600082015167ffffffffffffffff8111156200025857620002576200009a565b5b6200026684828501620001eb565b91505092915050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620002c257607f821691505b602082108103620002d857620002d76200027a565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620003427fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000303565b6200034e868362000303565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b60006200039b620003956200038f8462000366565b62000370565b62000366565b9050919050565b6000819050919050565b620003b7836200037a565b620003cf620003c682620003a2565b84845462000310565b825550505050565b600090565b620003e6620003d7565b620003f3818484620003ac565b505050565b5b818110156200041b576200040f600082620003dc565b600181019050620003f9565b5050565b601f8211156200046a576200043481620002de565b6200043f84620002f3565b810160208510156200044f578190505b620004676200045e85620002f3565b830182620003f8565b50505b505050565b600082821c905092915050565b60006200048f600019846008026200046f565b1980831691505092915050565b6000620004aa83836200047c565b9150826002028217905092915050565b620004c5826200026f565b67ffffffffffffffff811115620004e157620004e0620000ba565b5b620004ed8254620002a9565b620004fa8282856200041f565b600060209050601f8311600181146200053257600084156200051d578287015190505b6200052985826200049c565b86555062000599565b601f1984166200054286620002de565b60005b828110156200056c5784890151825560018201915060208501945060208101905062000545565b868310156200058c578489015162000588601f8916826200047c565b8355505b6001600288020188555050505b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620005ce82620005a1565b9050919050565b620005e081620005c1565b82525050565b600082825260208201905092915050565b600062000604826200026f565b620006108185620005e6565b93506200062281856020860162000174565b6200062d81620000a9565b840191505092915050565b60006040820190506200064f6000830185620005d5565b8181036020830152620006638184620005f7565b90509392505050565b610726806200067c6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063a41368621461003b578063fe50cc7214610057575b600080fd5b610055600480360381019061005091906102ad565b610075565b005b61005f6100c1565b60405161006c9190610375565b60405180910390f35b806000908161008491906105ad565b507fcbc299eeb7a1a982d3674880645107c4fe48c3227163794e48540a752272235433826040516100b69291906106c0565b60405180910390a150565b6060600080546100d0906103c6565b80601f01602080910402602001604051908101604052809291908181526020018280546100fc906103c6565b80156101495780601f1061011e57610100808354040283529160200191610149565b820191906000526020600020905b81548152906001019060200180831161012c57829003601f168201915b5050505050905090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6101ba82610171565b810181811067ffffffffffffffff821117156101d9576101d8610182565b5b80604052505050565b60006101ec610153565b90506101f882826101b1565b919050565b600067ffffffffffffffff82111561021857610217610182565b5b61022182610171565b9050602081019050919050565b82818337600083830152505050565b600061025061024b846101fd565b6101e2565b90508281526020810184848401111561026c5761026b61016c565b5b61027784828561022e565b509392505050565b600082601f83011261029457610293610167565b5b81356102a484826020860161023d565b91505092915050565b6000602082840312156102c3576102c261015d565b5b600082013567ffffffffffffffff8111156102e1576102e0610162565b5b6102ed8482850161027f565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610330578082015181840152602081019050610315565b60008484015250505050565b6000610347826102f6565b6103518185610301565b9350610361818560208601610312565b61036a81610171565b840191505092915050565b6000602082019050818103600083015261038f818461033c565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806103de57607f821691505b6020821081036103f1576103f0610397565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026104597fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261041c565b610463868361041c565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b60006104aa6104a56104a08461047b565b610485565b61047b565b9050919050565b6000819050919050565b6104c48361048f565b6104d86104d0826104b1565b848454610429565b825550505050565b600090565b6104ed6104e0565b6104f88184846104bb565b505050565b5b8181101561051c576105116000826104e5565b6001810190506104fe565b5050565b601f82111561056157610532816103f7565b61053b8461040c565b8101602085101561054a578190505b61055e6105568561040c565b8301826104fd565b50505b505050565b600082821c905092915050565b600061058460001984600802610566565b1980831691505092915050565b600061059d8383610573565b9150826002028217905092915050565b6105b6826102f6565b67ffffffffffffffff8111156105cf576105ce610182565b5b6105d982546103c6565b6105e4828285610520565b600060209050601f8311600181146106175760008415610605578287015190505b61060f8582610591565b865550610677565b601f198416610625866103f7565b60005b8281101561064d57848901518255600182019150602085019450602081019050610628565b8683101561066a5784890151610666601f891682610573565b8355505b6001600288020188555050505b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006106aa8261067f565b9050919050565b6106ba8161069f565b82525050565b60006040820190506106d560008301856106b1565b81810360208301526106e7818461033c565b9050939250505056fea264697066735822122051a137f3f2f370792efdafdfd52aa1721451dfaa2e804a5236730d97a26f237664736f6c63430008110033";

// Functions
// ========================================================
/**
 * parses eth_getLogs response payload and formats it into a semi-readable format
 * @param {*} logs 
 * @returns 
 */
const parseEthLogs = (logs) => {
    console.group('parseEthLogs');
    console.log({ logs });

    // Get all events from ABI file
    const events = CONTRACT_ABI.filter(obj => obj.type ? obj.type === "event" : false)
    console.log({ events });

    const hashedEvents = events.map(event => {
        const inputs = event.inputs?.map(input => input.type);
        const fullEventAndInputs = `${event.name}(${inputs?.length > 0 ? inputs.join(',') : ''})`;
        return {
            name: fullEventAndInputs,
            hashed: ethers.utils.keccak256(ethers.utils.toUtf8Bytes(fullEventAndInputs)),
            inputs,
            indexed: event.inputs?.filter(input => input.indexed),
            unindexed: event.inputs?.filter(input => !input.indexed),
        };
    });
    console.log({ hashedEvents });

    // Ethers.js AbiCoder is needed to avoid more code
    const decoder = new ethers.utils.AbiCoder();

    // Get all data logs and format them
    const decodedLogs = logs?.map((log, index) => {
        const toDecode = hashedEvents.find(hEvent => hEvent.hashed === log?.topics?.[0]);
        const decodedDataRaw = decoder.decode(toDecode?.unindexed, log.data);
        const decodedData = toDecode?.unindexed?.map((input, i) => {
            return {
                [input.name]: decodedDataRaw[i]
            }
        });

        return {
            ...log,
            blockNumber: parseInt(log.blockNumber, 16),
            data: decodedData,
            topics: log?.topics?.map(topic => hashedEvents.find(event => event.hashed === topic)),
            transactionHash: `${BLOCKCHAIN_EXPLORERS?.[CHAIN?.id] ?? ''}/tx/${log.transactionHash}`,
            transactionIndex: parseInt(log.transactionIndex, 16),
            logIndex: parseInt(log.logIndex, 16),
        }
    });
    console.log({ decodedLogs });

    console.groupEnd();
    return decodedLogs;
};


/**
 * Helper function that converts hex values to strings
 * @param {*} hex 
 * @returns 
 */
const hex2ascii = (hex) => {
    console.group('hex2ascii');
    console.log({ hex });
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        const v = parseInt(hex.substr(i, 2), 16);
        if (v) str += String.fromCharCode(v);
    }
    console.groupEnd();
    return str;
};

/**
 * Function that is needed to add the address to the clipboard
 * @param {*} address 
 * @returns 
 */
const onClickCopy = async (chainId) => {
    console.group('onClickCopy');
    console.log({ chainId });
    try {
        await navigator.clipboard.writeText(CONTRACT_ON_CHAINS?.[chainId]);
    } catch (error) {
        console.log({ error });
    }
    console.groupEnd();
    return false;
};

/**
 * 
 * @param {*} el 
 */
const onKeyUp = (event) => {
    console.group('onKeyUp');
    const chainId = event.target?.getAttribute('data-chain');
    const value = event.target?.value;
    const elPre = event?.currentTarget?.parentElement?.parentElement?.children[3]?.children[0];

    console.log({ key: event.key });
    console.log({ value });
    console.log({ chainId });
    console.log({ elPre });

    CONTRACT_ON_CHAINS[chainId] = value;
    elPre.innerHTML = value.length > 0 ? value : '(Please type a contract address currently deployed to your local node)';

    console.groupEnd();
};

/**
 * A function that builds a base for all contract addresses in the dropdown
 * @param {*} chainId 
 * @param {*} contract 
 * @param {*} isConnected 
 * @param {*} isMainnet 
 * @returns 
 */
const buildContractChainTemplate = (chainId, contract, isConnected, isMainnet) => {
    return `<div class="mb-2" id="contract-chain-${chainId}">
        <label class="flex items-center mb-2 text-zinc-400">
            ${CHAIN_DICTIONARY[chainId]} <span class="ml-2 bg-zinc-800 text-zinc-200 py-1 px-2 text-sm rounded">${chainId}</span>
        </label>
        <span class="flex items-center text-zinc-100 mb-2 ${isConnected ? '' : 'hidden'}">
            <span class="mx-2 w-2 h-2 block bg-green-600 rounded-full"></span>
            Connected <em class="ml-2 text-red-500">${isMainnet
            ? '(Warning Will Require Real Native Crypto For Payable Transactions)'
            : ''}</em>
        </span>
        
        ${CHAIN_LOCAL.includes(parseInt(chainId)) ? `<div class="relative mb-4">
            <label for="input-contract-address-local" class="block mb-2 text-zinc-600">Contrat Address</label>
            <input data-chain="${chainId}" onkeyup="return (function(event){ onKeyUp(event); })(event);" class="h-10 w-full px-3 rounded border bg-white" type="text"
            name="message" placeholder="Ex: 0xdc338d9f59e8a..." />
        </div>` : ''}
        <code class="block relative bg-zinc-500 p-6 rounded bg-zinc-800 text-zinc-200">
            <pre>${contract && contract.length > 0 ? contract : '&nbsp;'}</pre>
            ${!CHAIN_LOCAL.includes(parseInt(chainId)) ? `<a target="_blank" href="${BLOCKCHAIN_EXPLORERS?.[chainId] ?? ''}/address/${contract}" class="h-10 absolute top-4 bottom-0 right-6 inline-block leading-10 mb-2 bg-zinc-200 text-zinc-800 px-5 rounded-full font-medium disabled:bg-opacity-30">Link</a>` : ''}
            <a onClick="return (function(event){ onClickCopy('${chainId}'); return false; })(event);" href="#${contract}" class="h-10 absolute top-4 bottom-0 right-28 inline-block leading-10 mb-2 bg-zinc-500 hover:bg-zinc-200 transition-colors ease-in-out duration-200 text-zinc-800 px-5 rounded-full font-medium disabled:bg-opacity-30">Copy</a>
        </code>
    </div>`
};

/**
 * When a wallet connection occurs
 */
const onWalletConnection = () => {
    console.group('onWalletConnection');

    // Disable connect button
    const buttonConnect = document.getElementById('button-connect');
    buttonConnect.setAttribute('disabled', true);
    buttonConnect.innerHTML = 'Connected';

    // Show connected section
    const sectionConnected = document.getElementById('section-connected');
    sectionConnected.classList = '';

    const preWalletAddress = document.getElementById('pre-wallet-address');
    preWalletAddress.innerHTML = ACCOUNT_CONNECTED;

    const preWalletNetwork = document.getElementById('pre-wallet-network');
    preWalletNetwork.innerHTML = `${CHAIN?.id} / ${CHAIN?.name}`;

    // Reset connected
    const contractChains = document.getElementById('contract-chains').parentElement.children[1];
    contractChains.innerHTML = '';

    Object.keys(CHAIN_DICTIONARY).forEach(chain => {
        const contractChain = buildContractChainTemplate(
            chain,
            CONTRACT_ON_CHAINS[chain],
            `${CHAIN?.id}` === `${chain}`,
            CHAIN_MAINNETS.includes(parseInt(chain))
        );
        contractChains.innerHTML += contractChain;
    });

    console.groupEnd();
};

/**
 * 
 */
const onWalletDisconnect = () => {
    console.group('onWalletDisconnect');

    // Hide connected section
    const sectionConnected = document.getElementById('section-connected');
    sectionConnected.classList = 'hidden';

    // Enabled connect button
    const buttonConnect = document.getElementById('button-connect');
    buttonConnect.removeAttribute('disabled');
    buttonConnect.innerHTML = 'Connect Wallet';

    console.groupEnd();
};

/**
 * toggle menu button open and closed
 * @param {*} event 
 */
const toggleMenu = (event) => {
    console.group('toggleMenu');
    console.log({ IS_MENU_OPEN });

    // h-full overflow-y-scroll
    const body = document.querySelector('body');
    const nav = event.currentTarget.parentElement;
    const span1 = event.currentTarget.children[0];
    const span2 = event.currentTarget.children[1];

    if (!IS_MENU_OPEN) {
        body.classList.value = `${body.classList.value} overflow-hidden`;
        nav.classList.value = `${nav.classList.value.replaceAll('h-[80px]')} h-full`;
        span1.classList.value = `${span2.classList.value.replaceAll('rotate-0')} -rotate-45`;
        span2.classList.value = `${span2.classList.value.replaceAll('rotate-90')} rotate-45`;
    } else {
        body.classList.value = `${body.classList.value.replaceAll('overflow-hidden')}`;
        nav.classList.value = `${nav.classList.value.replaceAll('h-full')} h-[80px]`;
        span1.classList.value = `${span2.classList.value.replaceAll('-rotate-45')} rotate-0`;
        span2.classList.value = `${span2.classList.value.replaceAll('rotate-45')} rotate-90`;
    }

    IS_MENU_OPEN = !IS_MENU_OPEN;
    console.groupEnd();
};

/**
 * 
 */
const connect = async () => {
    console.group('connect');

    const devErrorConnect = document.getElementById('div-error-connect');
    devErrorConnect.innerHTML = '';
    devErrorConnect.classList = devErrorConnect.classList.value.includes('hidden')
        ? devErrorConnect.classList.value
        : `${devErrorConnect.classList.value} hidden`;
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        onChainChanged(chainId);
        ACCOUNT_CONNECTED = accounts[0];
        IS_CONNECTED = true;
        onWalletConnection();
    } catch (error) {
        console.log({ error });
        devErrorConnect.innerHTML = error?.message ?? 'Unknown wallet connection error.'
        devErrorConnect.classList = devErrorConnect.classList.value.replaceAll('hidden', '');
    }
    console.groupEnd();
};

/**
 * 
 */
const disconnect = () => {
    console.group('disconnect');

    ACCOUNT_CONNECTED = false;
    IS_CONNECTED = false;
    onWalletDisconnect();

    console.groupEnd();
};

/**
 * 
 * @param {*} accounts 
 */
const onAccountsChanged = (accounts) => {
    console.group('onAccountsChanged');
    console.log({ accounts });

    if (accounts.length === 0) {
        onWalletDisconnect();
    } else {
        ACCOUNT_CONNECTED = accounts?.[0];
        onWalletConnection();
    }

    console.groupEnd();
};

/**
 * 
 * @param {*} chainId 
 */
const onChainChanged = (chainId) => {
    console.group('onChainChanged');
    console.log({ chainId });

    const parsedChainId = parseInt(`${chainId}`, 16);
    CHAIN = {
        name: CHAIN_DICTIONARY?.[parsedChainId],
        id: parsedChainId
    };
    onWalletConnection();

    console.groupEnd();
};

/**
 * 
 * @param {*} event 
 */
const onSubmitWalletBalance = async (event) => {
    console.group('onSubmitWalletBalance');
    event.preventDefault();

    // Reset & Set Loading State
    const preWalletBalance = document.getElementById('pre-wallet-balance');
    preWalletBalance.innerHTML = '(Loading...)';
    const button = document.querySelector(`#${event.currentTarget.id} button`);
    button.setAttribute('disabled', true);

    try {
        const balance = await ethereum.request({
            method: 'eth_getBalance',
            params: [ACCOUNT_CONNECTED, 'latest'],
        });
        const formatted = ethers.utils.formatEther(balance);
        preWalletBalance.innerHTML = `${balance}\n\n// ${parseInt(balance, 16)} Gwei Equiv.\n// OR ${formatted} Native Currency`;
    } catch (error) {
        console.log({ error });
        preWalletBalance.innerHTML = error?.message ?? 'Unknown wallet error.';
    }

    button.removeAttribute('disabled');
    console.groupEnd();
};

/**
 * 
 * @param {*} event 
 */
const onSubmitNetworkChain = async (event) => {
    console.group('onSubmitNetworkChain');
    event.preventDefault();

    // Reset & Set Loading State
    const preNetworkChain = document.getElementById('pre-network-chain');
    preNetworkChain.innerHTML = '(Loading...)';
    const button = document.querySelector(`#${event.currentTarget.id} button`);
    button.setAttribute('disabled', true);

    try {
        const chain = await ethereum.request({
            method: 'net_version',
        });
        preNetworkChain.innerHTML = `${chain}\n\n// ${CHAIN_DICTIONARY[chain]}`;
    } catch (error) {
        console.log({ error });
        preNetworkChain.innerHTML = error?.message ?? 'Unknown network error.'
    }

    button.removeAttribute('disabled');
    console.groupEnd();
};

/**
 * 
 * @param {*} event 
 */
const onSubmitNetworkBlock = async (event) => {
    console.group('onSubmitNetworkBlock');
    event.preventDefault();

    // Reset & Set Loading State
    const preNetworkBlock = document.getElementById('pre-network-block');
    preNetworkBlock.innerHTML = '(Loading...)';
    const button = document.querySelector(`#${event.currentTarget.id} button`);
    button.setAttribute('disabled', true);

    try {
        const block = await ethereum.request({
            method: 'eth_blockNumber',
        });
        preNetworkBlock.innerHTML = `${block}\n\n// ${parseInt(block, 16)} Block Number`;
    } catch (error) {
        console.log({ error });
        preNetworkBlock.innerHTML = error?.message ?? 'Unknown block number error.'
    }

    button.removeAttribute('disabled');
    console.groupEnd();
};

/**
 * 
 * @param {*} event 
 */
const onSubmitSignMessage = async (event) => {
    console.group('onSubmitSignMessage');
    event.preventDefault();

    // Reset & Set Loading State
    const preWalletSignature = document.getElementById('pre-wallet-signature');
    preWalletSignature.innerHTML = '(Loading...)';
    const button = document.querySelector(`#${event.currentTarget.id} button`);
    button.setAttribute('disabled', true);

    // Retrieve message
    const message = event.currentTarget.message.value;
    console.log({ message });

    if (!message) return;
    try {
        const signature = await ethereum.request({
            method: 'personal_sign',
            params: [message, ACCOUNT_CONNECTED],
        });
        preWalletSignature.innerHTML = signature;
    } catch (error) {
        console.log({ error });
        preWalletSignature.innerHTML = error?.message ?? 'Unknown signature error.';
    }

    button.removeAttribute('disabled');
    console.groupEnd();
};

/**
 * 
 * @param {*} event 
 */
const onSubmitVerifySignature = (event) => {
    console.group('onSubmitVerifySignature');
    event.preventDefault();

    // Reset & Set Loading State
    const preSignatureVerification = document.getElementById('pre-signature-verification');
    preSignatureVerification.innerHTML = '(Loading...)';
    const button = document.querySelector(`#${event.currentTarget.id} button`);
    button.setAttribute('disabled', true);

    // Retrieve values
    const message = event.currentTarget.message.value;
    const signature = event.currentTarget.signature.value;
    console.log({ message });
    console.log({ signature });

    // For the sake of showing all the code, we're going to use ethers.js to verify the message and signature
    if (ethers?.utils?.verifyMessage) {
        const verifiedAddress = ethers.utils.verifyMessage(message, signature);
        console.log({ verifiedAddress });
        preSignatureVerification.innerHTML = `CONNECTED ADDRESS: ${ACCOUNT_CONNECTED}\nVERIFICATION ADDRESS: ${verifiedAddress}\nMATCHES? ${ACCOUNT_CONNECTED.toLowerCase() === verifiedAddress.toLowerCase()}`;
    }

    button.removeAttribute('disabled');
    console.groupEnd();
};

/**
 * 
 * @param {*} event 
 */
const onSubmitContractRead = async (event) => {
    console.group('onSubmitContractRead');
    event.preventDefault();

    // Reset & Set Loading State
    const preContractRead = document.getElementById('pre-contract-read');
    preContractRead.innerHTML = '(Loading...)';
    const button = document.querySelector(`#${event.currentTarget.id} button`);
    button.setAttribute('disabled', true);

    // Setup Interface + Encode Function
    const GetGreeting = CONTRACT_ABI.find(i => i.name === 'getGreeting');
    const interface = new ethers.utils.Interface([GetGreeting]);
    const encodedFunction = interface.encodeFunctionData(`${GetGreeting.name}`);
    console.log({ encodedFunction });

    // Request getGreeting
    try {
        const result = await window.ethereum.request({
            method: 'eth_call', params: [{
                to: CONTRACT_ON_CHAINS[CHAIN.id], "data": encodedFunction
            }, "latest"]
        });
        preContractRead.innerHTML = `${result}\n\n// ${hex2ascii(result)}`;
    } catch (error) {
        console.log({ error });
        preContractRead.innerHTML = error?.message ?? 'Unknown contract read error.';
        if (CHAIN_LOCAL.includes(CHAIN?.id) && CONTRACT_ON_CHAINS?.[CHAIN?.id]?.length === 0) {
            preContractRead.innerHTML += `\n\n// No contract specified. Enter a contract in the Contract Addresses section.`
        }
    }

    button.removeAttribute('disabled');
    console.groupEnd();
};

/**
 * 
 * @param {*} event 
 */
const onSubmitContractWrite = async (event) => {
    event.preventDefault();
    console.group('onSubmitContractWrite');
    console.log({ greeting: event.currentTarget.greeting.value });

    // Reset & Set Loading State
    const preContractWrite = document.getElementById('pre-contract-write');
    preContractWrite.innerHTML = '(Loading...)';
    const button = document.querySelector(`#${event.currentTarget.id} button`);
    button.setAttribute('disabled', true);

    // Setup Interface + Encode Function
    const SetGreeting = CONTRACT_ABI.find(i => i.name === 'setGreeting');
    const interface = new ethers.utils.Interface([SetGreeting]);
    const encodedFunction = interface.encodeFunctionData(`${SetGreeting.name}`, [event.currentTarget.greeting.value]);
    console.log({ encodedFunction });

    // Request getGreeting
    try {
        const result = await window.ethereum.request({
            method: 'eth_sendTransaction', params: [{
                from: ACCOUNT_CONNECTED,
                to: CONTRACT_ON_CHAINS[CHAIN.id],
                "data": encodedFunction
            }, "latest"]
        });
        preContractWrite.innerHTML = `${result}\n\n// ${BLOCKCHAIN_EXPLORERS?.[CHAIN?.id] ?? ''}/tx/${result}`;
    } catch (error) {
        console.log({ error });
        preContractWrite.innerHTML = error?.message ?? 'Unknown contract write error.';
        if (CHAIN_LOCAL.includes(CHAIN?.id) && CONTRACT_ON_CHAINS?.[CHAIN?.id]?.length === 0) {
            console.log('true');
            preContractWrite.innerHTML += `\n\n// No contract specified. Enter a contract in the Contract Addresses section.`
        }
    }

    button.removeAttribute('disabled');
    console.groupEnd();
};

/**
 * 
 * @param {*} event 
 */
const onSubmitContractLogs = async (event) => {
    event.preventDefault();
    console.group('onSubmitContractLogs');

    // Inputs
    const address = event.target.address.value;
    const fromBlock = event.target.fromBlock.value;
    const toBlock = event.target.toBlock.value;
    const topics = event.target.topics.value;

    console.log({ address });
    console.log({ fromBlock });
    console.log({ toBlock });
    console.log({ topics });

    // Reset & Set Loading State
    const preContractLogs = document.getElementById('pre-contract-logs');
    preContractLogs.innerHTML = '(Loading...)';
    const button = document.querySelector(`#${event.currentTarget.id} button`);
    button.setAttribute('disabled', true);

    // Request logs
    try {
        // Encode from / to
        const from = fromBlock === 'latest' ? fromBlock : `0x${parseInt(fromBlock).toString(16)}`;
        const to = toBlock === 'latest' ? toBlock : `0x${parseInt(toBlock).toString(16)}`;
        console.log({ from });
        console.log({ to });

        // Encode Function
        let topicsArray = JSON.parse(topics);
        if (topicsArray.length > 0) {
            topicsArray = topicsArray.map(i => ethers.utils.keccak256(ethers.utils.toUtf8Bytes(i)))
        }
        console.log({ topicsArray });

        const result = await window.ethereum.request({
            method: 'eth_getLogs', params: [{
                fromBlock: from,
                toBlock: to,
                address,
                topics: topicsArray
            }]
        });

        // Many thanks to William Schwab's (@w.s.schwab) article for decoding:
        // https://medium.com/linum-labs/everything-you-ever-wanted-to-know-about-events-and-logs-on-ethereum-fec84ea7d0a5
        preContractLogs.innerHTML = `${JSON.stringify(result, null, ' ')}\n\n// DECODED:\n${JSON.stringify(parseEthLogs(result), null, ' ')}`;
    } catch (error) {
        console.log({ error });
        preContractLogs.innerHTML = error?.data?.message ?? error?.message ?? 'Unknown contract logs error.';
    }

    button.removeAttribute('disabled');
    console.groupEnd();
}

/**
 * 
 * @param {*} event 
 */
const onSubmitContractDeploy = async (event) => {
    event.preventDefault();
    console.group('onSubmitContractDeploy');
    console.log({ greeting: event.currentTarget.greeting.value });

    // Encode function and value to append to bytecode
    const encodedFunctionValue = ethers.utils.defaultAbiCoder.encode(["string"], [`${event.currentTarget.greeting.value}`]).slice(2);
    console.log({ encodedFunctionValue });

    // Reset & Set Loading State
    const preContractDeploy = document.getElementById('pre-contract-deploy');
    preContractDeploy.innerHTML = '(Loading...)';
    const button = document.querySelector(`#${event.currentTarget.id} button`);
    button.setAttribute('disabled', true);

    // Combining bytecode with input bytecode
    const fullByteCode = `${CONTRACT_BYTECODE}${encodedFunctionValue}`;
    console.log({ fullByteCode });

    // Request deploy contrat
    try {
        const result = await window.ethereum.request({
            method: 'eth_sendTransaction', params: [{
                from: ACCOUNT_CONNECTED,
                "data": fullByteCode
            }, "latest"]
        });

        const tx = await await window.ethereum.request({
            method: 'eth_getTransactionReceipt', params: [result]
        });

        console.log({ tx });
        preContractDeploy.innerHTML = `${result}\n\n// ${tx?.contractAddress ? `CONTRACT ADDRESS:\n// ${tx?.contractAddress}` : ''}`;
    } catch (error) {
        console.log({ error });
        preContractDeploy.innerHTML = error?.message ?? 'Unknown contract deploy error.';
    }

    button.removeAttribute('disabled');
    console.groupEnd();
};

/**
 * 
 * @param {*} event 
 */
const onClickContractToggle = (event) => {
    console.group('onClickContractToggle');
    const dropDown = event.target.parentElement.children[1];
    const carret = event.target.parentElement.children[0].children[0];
    const isDropDownOpen = dropDown.classList.value.includes('hidden');
    console.log({ dropDown });
    console.log({ carret });
    console.log({ isDropDownOpen });

    // Toggle class
    dropDown.classList = isDropDownOpen
        ? dropDown.classList.value.replaceAll('hidden', '')
        : `${dropDown.classList.value} hidden`;

    // Toggle carret
    carret.innerHTML = isDropDownOpen
        ? '&#9650;'
        : '&#9660;'

    console.groupEnd();
};

// Initial Script Loaded On Window Loaded
// ========================================================
/**
 * Init
 */
window.onload = async () => {
    // Check if browser has wallet integration
    if (typeof window?.ethereum !== "undefined") {
        IS_BROWSER_SUPPORTED = true;

        // Window ethereum on change
        window.ethereum.on('accountsChanged', onAccountsChanged);
        window.ethereum.on('chainChanged', onChainChanged);

        // Check if there are any existing permissions to see if the wallet is connected
        WALLET_PERMISSION = await window.ethereum.request({ method: 'wallet_getPermissions' });

        if (WALLET_PERMISSION.length !== 0) {
            connect();
        }
    }

    // Get All Elements
    const buttonMenu = document.getElementById('button-menu');
    const buttonConnect = document.getElementById('button-connect');
    const buttonDisconnect = document.getElementById('button-disconnect');
    const formWalletBalance = document.getElementById('form-wallet-balance');
    const formNetworkChain = document.getElementById('form-network-chain');
    const formNetworkBlock = document.getElementById('form-network-block');
    const formSignMessage = document.getElementById('form-sign-message');
    const formVerifySignature = document.getElementById('form-verify-signature')
    const formContractRead = document.getElementById('form-contract-read');
    const formContractWrite = document.getElementById('form-contract-write');
    const formContractLogs = document.getElementById('form-contract-logs');
    const formContractDeploy = document.getElementById('form-contract-deploy');
    const contractChains = document.getElementById('contract-chains');
    const contractCode = document.getElementById('contract-code');
    const contractAbi = document.getElementById('contract-abi');
    const contractBytecode = document.getElementById('contract-bytecode');
    const contractDeployExample = document.getElementById('contract-deploy-example');

    // Add Interactions
    buttonMenu.addEventListener('click', toggleMenu);
    buttonConnect.addEventListener('click', connect);
    buttonDisconnect.addEventListener('click', disconnect);
    formWalletBalance.addEventListener('submit', onSubmitWalletBalance);
    formNetworkChain.addEventListener('submit', onSubmitNetworkChain);
    formNetworkBlock.addEventListener('submit', onSubmitNetworkBlock);
    formSignMessage.addEventListener('submit', onSubmitSignMessage);
    formVerifySignature.addEventListener('submit', onSubmitVerifySignature);
    formContractRead.addEventListener('submit', onSubmitContractRead);
    formContractWrite.addEventListener('submit', onSubmitContractWrite);
    formContractLogs.addEventListener('submit', onSubmitContractLogs);
    formContractDeploy.addEventListener('submit', onSubmitContractDeploy);
    contractChains.addEventListener('click', onClickContractToggle);
    contractCode.addEventListener('click', onClickContractToggle);
    contractAbi.addEventListener('click', onClickContractToggle);
    contractBytecode.addEventListener('click', onClickContractToggle);

    // Load Contract ABI
    contractAbi.parentElement.children[1].children[0].children[0].innerHTML = `${JSON.stringify(CONTRACT_ABI, null, ' ')}`;

    // Load Contract bytecode
    contractBytecode.parentElement.children[1].children[0].children[0].innerHTML = `${CONTRACT_BYTECODE}`;

    // Display bytecode and input
    contractDeployExample.children[0].innerHTML = `BYTECODE:\n${CONTRACT_BYTECODE.slice(0, 10)}...${CONTRACT_BYTECODE.slice(-10)}\n\nINPUT:\n"Hello there"\n// 0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b48656c6c6f207468657265000000000000000000000000000000000000000000\n\nTOGETHER:\n// ${CONTRACT_BYTECODE + ethers.utils.defaultAbiCoder.encode(["string"], ["Hello there"]).slice(2)}`;

    // Active elements
    if (IS_BROWSER_SUPPORTED) {
        buttonConnect.removeAttribute('disabled');
        buttonConnect.innerHTML = "Connect Wallet";
    }
};