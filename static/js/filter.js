(function () {
    "use strict";

    var input = document.getElementById("species-filter");
    var list = document.getElementById("species-list");
    if (!input || !list) return;

    var items = Array.prototype.slice.call(list.querySelectorAll("li"));
    var counter = document.getElementById("result-count");
    var emptyState = document.getElementById("no-results");
    var initialText = counter ? counter.textContent : "";

    function normalize(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    var searchTexts = items.map(function (item) {
        return normalize(item.getAttribute("data-search") || item.textContent);
    });

    function applyFilter() {
        var query = normalize(input.value.trim());
        var visible = 0;

        items.forEach(function (item, index) {
            var matches = !query || searchTexts[index].indexOf(query) !== -1;
            item.hidden = !matches;
            if (matches) visible += 1;
        });

        if (counter) {
            counter.textContent = query ? visible + " találat" : initialText;
        }

        if (emptyState) {
            emptyState.hidden = !(query && visible === 0);
        }

        var url = new URL(window.location.href);
        if (query) {
            url.searchParams.set("q", input.value.trim());
        } else {
            url.searchParams.delete("q");
        }
        window.history.replaceState(null, "", url);
    }

    var initialQuery = new URLSearchParams(window.location.search).get("q");
    if (initialQuery && !input.value) {
        input.value = initialQuery;
    }
    if (input.value.trim()) {
        applyFilter();
    }

    input.addEventListener("input", applyFilter);
    input.addEventListener("search", applyFilter);
})();
