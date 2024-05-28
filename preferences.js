"use strict";

(function() {

	let m_elmUnloadPinnedTabs;

	document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
	window.addEventListener("unload", onUnload);

	////////////////////////////////////////////////////////////////////////////////////
	function onDOMContentLoaded() {
		m_elmUnloadPinnedTabs = document.getElementById("unloadPinnedTabs");

		document.documentElement.addEventListener("click", onClickPreference);
		m_elmUnloadPinnedTabs.addEventListener("change", onChangeUnloadPinnedTabs);

		pref.getUnloadPinnedTabs().then((result) => m_elmUnloadPinnedTabs.checked = result );
	}

	////////////////////////////////////////////////////////////////////////////////////
	function onUnload() {
		document.removeEventListener("DOMContentLoaded", onDOMContentLoaded);
		window.removeEventListener("unload", onUnload);

		document.documentElement.removeEventListener("click", onClickPreference);
		m_elmUnloadPinnedTabs.removeEventListener("change", onChangeUnloadPinnedTabs);
	}

	////////////////////////////////////////////////////////////////////////////////////
	function onClickPreference(event) {

		if( !!event.target && event.target.classList.contains("preference") ) {

			let elmInput = event.target.querySelector("input[type=checkbox]");
			if(!!elmInput) {
				event.stopPropagation();
				elmInput.click();
			}
		}
	}

	////////////////////////////////////////////////////////////////////////////////////
	function onChangeUnloadPinnedTabs() {
		pref.setUnloadPinnedTabs(m_elmUnloadPinnedTabs.checked);
	}
})();
