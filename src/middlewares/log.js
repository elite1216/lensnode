import { configureChains, createClient, watchNetwork } from '@wagmi/core';
import { goerli, mainnet } from '@wagmi/core/chains';
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/html';

//import type { RuntimeConfiguration } from '@/plugins/runtimeConfiguration';
//import { store } from '@/store/store';

let web3modal= Web3Modal;

const walletConnectId = '7f761cbff0b73aecf07a7725c1c2b3b0'
const initWalletConnect = () => {
	const chains =  [mainnet];
	const projectId = walletConnectId;

	const { provider, webSocketProvider } = configureChains([mainnet], [walletConnectProvider({ projectId })]);
	const wagmiClient = createClient({
		autoConnect: true,
		connectors: modalConnectors({ projectId, version: '2', appName: 'WM Chip', chains }),
		provider,
		webSocketProvider,
	});

	const ethereumClient = new EthereumClient(wagmiClient, chains);
	console.log('here')
	web3modal = new Web3Modal(
		{ projectId, themeMode: 'dark', themeColor: 'blackWhite', themeBackground: 'themeColor' },
		ethereumClient
	);

	web3modal.openModal();
};

export { initWalletConnect, web3modal };