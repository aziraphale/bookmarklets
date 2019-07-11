// ==ClosureCompiler==
// @output_file_name rss.min.js
// @compilation_level ADVANCED_OPTIMIZATIONS
// ==/ClosureCompiler==

var query, elements, links=[], others=[], i, element, html, ourWindow;
try {
    query = "[href$='.atom'], [href*='.atom?'], [href$='.rss'], [href*='.rss?'], [href*='/rss.'], [href*='/feed.'], [href*='/atom.'], [href*='//feeds.feedburner.com/'], [href*='/feed/'], [type='application/atom+xml'], [type='application/rss+xml']";
    elements = document.querySelectorAll(query);
    if (elements && elements.length > 0) {
        for (i=0; i<elements.length; i++) {
            element = elements[i];
            if (element.tagName === 'LINK') {
                links.push(element);
            } else {
                others.push(element);
            }
        }
    }
} catch (e) {}
if (links.length > 0 || others.length > 0) {
    // Using HTML because I can't really be arsed with createElement() et al. There's a reason jQuery optimised that process!
    html = "<h1>&lt;link&gt; tags</h1><ul>";
    if (links.length > 0) {
        for (i = 0; i < links.length; i++) {
            html += '<li><a href="' + links[i].href + '">' + links[i].href + ' - &ldquo;' + links[i].title + '&rdquo;</a></li>';
        }
    } else {
        html += '<li><em>None found...</em></li>';
    }

    html += "</ul><h1>Other tags (&lt;a&gt;, etc.)</h1><ul>";
    if (others.length > 0) {
        for (i = 0; i < others.length; i++) {
            html += '<li><a href="' + links[i].href + '">' + links[i].outerHTML + '</a></li>';
        }
    } else {
        html += '<li><em>None found...</em></li>';
    }

    html += "</ul>";

    ourWindow = window.open('', 'rss-urls', "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1000, height=450, top=100, left=100");
    ourWindow.document.write(html);
    //ourWindow.document.innerHTML = html; // Why doesn't this work?! o.O
} else {
    alert("Unable to find any RSS/Atom feed references :(");
}
