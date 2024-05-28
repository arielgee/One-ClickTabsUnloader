"use strict";

initialization();

////////////////////////////////////////////////////////////////////////////////////
async function initialization() {

	const allTabs = await browser.tabs.query({});
	const activeTabs = allTabs.reduce((count, tab) => tab.active ? ++count : count, 0);
	const pinnedTabs = allTabs.reduce((count, tab) => tab.pinned ? ++count : count, 0);
	const unloadPinned = await pref.getUnloadPinnedTabs();
	const discardableTabs = (await getDiscardableTabIds()).length;

	document.getElementById("line1").textContent = "Active: " + activeTabs + "/" + allTabs.length;
	document.getElementById("line2").textContent = "Pinned: " + pinnedTabs + "/" + allTabs.length + (unloadPinned ? " ✔" : " ✘");		// ✔️ ❌
	document.getElementById("line3").textContent = "Discardable: " + discardableTabs + "/" + allTabs.length;
}
