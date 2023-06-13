"use strict";

browser.action.onClicked.addListener((_, OnClickData) => {

	if(OnClickData.modifiers.includes("Shift")) {

		browser.action.setPopup({ popup: "/popup.html" });
		browser.action.openPopup();
		setTimeout(() => browser.action.setPopup({ popup: "" }), 750);

	} else {

		getDiscardableTabIds().then(tabIds => {
			browser.tabs.discard(tabIds).then(async () => {

				const notifyId = `octu-${Date.now() * Math.random()}`;

				browser.notifications.create(notifyId, {
					type: "basic",
					title: "One-Click Tabs Unloader",
					eventTime: Date.now(),
					message: tabIds.length === 0 ? "Nothing to unload" : `${tabIds.length} tab${(tabIds.length>1 ? "s" : "")} unloaded`,
				});
				setTimeout(() => browser.notifications.clear(notifyId), 5000);

			});
		}).catch((e) => console.log("[One-ClickTabsUnloader]", e));
	}
});
