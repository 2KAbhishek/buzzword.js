import findAndReplaceDOMText from 'findandreplacedomtext';
import buzzwordTerms from './terms';

function revealBuzzword({text}) {
    const c = text.charAt(0);
    const last = text.length - 1;
    let buzzword = `${c === c.toUpperCase() ? 'B' : 'b'}uzzword`;

    if (text.substr(last - 2) === 'ing') {
        buzzword += 'ing';
    } else if (text.charAt(last - 1) !== 's' && text.charAt(last) === 's') {
        buzzword += 's';
    } else if (text.charAt(last - 2) !== 'e' && text.substr(last - 1) === 'ed') {
        buzzword += 'ed';
    } else if (text.charAt(last - 2) !== ('o' || 'e') && text.substr(last - 1) === ('or' || 'er')) {
        buzzword += 'er';
    }

    const abbr = document.createElement('abbr');
    abbr.style.color = 'red';
    abbr.title = text;
    abbr.innerHTML = buzzword;

    return abbr;
}

const buzzwordRe = new RegExp(`\\b(${buzzwordTerms.join('|')})\\b`, 'gi');

findAndReplaceDOMText(document.body, {
    find: buzzwordRe,
    replace: revealBuzzword,
    preset: 'prose'
});
