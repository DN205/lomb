(function () {
    "use strict";

    var input = document.getElementById("taxonomy-filter");
    var list = document.getElementById("taxonomy-list");
    if (!input || !list) return;

    var items = Array.prototype.slice.call(list.querySelectorAll("li"));
    var counter = document.getElementById("taxonomy-count");
    var emptyState = document.getElementById("taxonomy-no-results");
    var initialText = counter ? counter.textContent : "";
    var limitButtons = Array.prototype.slice.call(
        document.querySelectorAll("[data-taxonomy-limit]")
    );
    var limitKey = "lomb-taxonomy-limit";
    var defaultLimit = "all";
    var limit = readLimit();

    function readLimit() {
        var stored;
        try {
            stored = window.localStorage.getItem(limitKey);
        } catch (error) {
            stored = null;
        }
        var known = limitButtons.some(function (button) {
            return button.getAttribute("data-taxonomy-limit") === stored;
        });
        return known ? stored : defaultLimit;
    }

    function applyLimit() {
        limitButtons.forEach(function (button) {
            button.setAttribute(
                "aria-pressed",
                button.getAttribute("data-taxonomy-limit") === limit ? "true" : "false"
            );
        });
    }

    limitButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            limit = button.getAttribute("data-taxonomy-limit");
            applyLimit();
            applyFilter();
            try {
                window.localStorage.setItem(limitKey, limit);
            } catch (error) {
                // Storage may be unavailable; the choice still applies to this page.
            }
        });
    });
    applyLimit();

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
        var tokens = query ? query.split(/\s+/).filter(Boolean) : [];
        var max = limit === defaultLimit ? items.length : parseInt(limit, 10);
        var matches = 0;
        var shown = 0;

        items.forEach(function (item, index) {
            var isMatch = tokens.every(function (token) {
                return searchTexts[index].indexOf(token) !== -1;
            });
            if (isMatch) matches += 1;
            var visible = isMatch && matches <= max;
            item.hidden = !visible;
            if (visible) shown += 1;
        });

        if (counter) {
            var text = query ? matches + " találat" : initialText;
            if (shown < matches) {
                text += " · " + shown + " megjelenítve";
            }
            counter.textContent = text;
        }

        if (emptyState) {
            emptyState.hidden = !(query && matches === 0);
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
    applyFilter();

    input.addEventListener("input", applyFilter);
    input.addEventListener("search", applyFilter);
})();
