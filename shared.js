"use strict";

////////////////////////////////////////////////////////////////////////////////////
async function getDiscardableTabIds() {
	const tabs = await browser.tabs.query({ active: false, discarded: false });	// 'autoDiscardable' is not implemented
	const tabIds = tabs.map(x => x.url.startsWith("about:") ? undefined : x.id).filter(x => x);
	return tabIds;
}
