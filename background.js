"use strict";

// ++ MV3 browser.action.onClicked.addListener(() => {
browser.browserAction.onClicked.addListener(() => {

	browser.tabs.query({ active: false, discarded: false }).then(tabs => {		// 'autoDiscardable' is not implemented

		let tabIds = tabs.map(x => x.url.startsWith("about:") ? undefined : x.id).filter(x => x);

		browser.tabs.discard(tabIds).then(async () => {

			let notifyId = `octu-${Date.now() * Math.random()}`;

			browser.notifications.create(notifyId, {
				type: "basic",
				title: "One-Click Tabs Unloader",
				eventTime: Date.now(),
				message: `Unloaded Tabs: ${tabIds.length}`,
			});
			setTimeout(() => browser.notifications.clear(notifyId), 5000);

		});
	}).catch((e) => console.log("[One-ClickTabsUnloader]", e));
});
