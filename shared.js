"use strict";

////////////////////////////////////////////////////////////////////////////////////
let pref = (function () {

	const m_pref_unloadPinnedTabs = "pref_unloadPinnedTabs";
	const m_localStorage = browser.storage.local;

	////////////////////////////////////////////////////////////////////////////////////
	function setUnloadPinnedTabs(value) {
		return browser.storage.local.set({ [m_pref_unloadPinnedTabs]: value });
	}

	////////////////////////////////////////////////////////////////////////////////////
	function getUnloadPinnedTabs() {
		return new Promise((resolve) => {
			m_localStorage.get(m_pref_unloadPinnedTabs).then((result) => {
				resolve(result[m_pref_unloadPinnedTabs] === undefined ? true : result[m_pref_unloadPinnedTabs]);
			});
		});
	}

	return {
		setUnloadPinnedTabs: setUnloadPinnedTabs,
		getUnloadPinnedTabs: getUnloadPinnedTabs,
	}
}());

////////////////////////////////////////////////////////////////////////////////////
async function getDiscardableTabIds() {
	const unloadPinned = await pref.getUnloadPinnedTabs();
	const tabs = await browser.tabs.query({ active: false, discarded: false, pinned: (unloadPinned ? undefined : false) });
	const tabIds = tabs.map(x => x.url.startsWith("about:") ? undefined : x.id).filter(x => x);
	return tabIds;
}
