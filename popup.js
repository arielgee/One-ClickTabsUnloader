"use strict";

initialization();

////////////////////////////////////////////////////////////////////////////////////
async function initialization() {

	const allTabs = await browser.tabs.query({});
	const activeTabs = allTabs.reduce((count, tab) => tab.active ? ++count : count, 0);
	const discardableTabs = (await getDiscardableTabIds()).length;

	document.getElementById("line1").textContent = "Active: " + activeTabs + "/" + allTabs.length;
	document.getElementById("line2").textContent = "Discardable: " + discardableTabs + "/" + allTabs.length;
}
