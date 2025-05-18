module.exports = formatResults;

const pb = {
    leGreen: '<:LEgreen:1271261417118498909>',
    meGreen: '<:MEgreen:1271261538182762567>',
    reGreen: '<:REgreen:1271261638498189394>',
    lfGreen: '<:LFgreen:1271261500459192434>',
    mfGreen: '<:MFgreen:1271261575403012146>',
    rfGreen: '<:RFgreen:1271261669825445929>',
    leRed: '<:LEred:1271261480389705740>',
    meRed: '<:MEred:1271261559053619283>',
    reRed: '<:REred:1271261654121844776>',
    lfRed: '<:LFred:1271261518964588584>',
    mfRed: '<:MFred:1271261622283010058>',
    rfRed: '<:RFred:1271261687319625908>',
};

function calculateColor(upvotePercentage, downvotePercentage) {
    if (upvotePercentage === 0) {
        return 'red'; // All downvotes, set to red
    } else if (downvotePercentage === 0) {
        return 'green'; // All upvotes, set to green
    } else {
        return 'mixed'; // Mixed votes, set to a mix of green and red
    }
}

function formatResults(upvotes = [], downvotes = []) {
    const totalVotes = upvotes.length + downvotes.length;
    const progressBarLength = 26; // Set the length to 26

    const upvotePercentage = upvotes.length / totalVotes;
    const downvotePercentage = downvotes.length / totalVotes;

    const color = calculateColor(upvotePercentage, downvotePercentage);

    const halfProgressBarLength = progressBarLength / 2;
    const filledSquaresGreen = Math.min(Math.round(upvotePercentage * halfProgressBarLength), halfProgressBarLength) || 0;
    const filledSquaresRed = Math.min(Math.round(downvotePercentage * halfProgressBarLength), halfProgressBarLength) || 0;

    const upPercentage = upvotePercentage * 100 || 0;
    const downPercentage = downvotePercentage * 100 || 0;

    const progressBar =
        color === 'red'
            ? pb.lfRed + pb.mfRed.repeat(halfProgressBarLength) + pb.rfRed
            : color === 'green'
            ? pb.lfGreen + pb.mfGreen.repeat(halfProgressBarLength) + pb.rfGreen
            : (filledSquaresGreen ? pb.lfGreen : pb.leGreen) +
              (filledSquaresGreen ? pb.mfGreen : pb.meGreen) +
              (filledSquaresGreen ? pb.mfGreen : pb.meGreen) +
              (filledSquaresGreen ? pb.mfGreen : pb.meGreen) +
              (filledSquaresGreen ? pb.mfGreen : pb.meGreen) +
              (filledSquaresGreen ? pb.mfGreen : pb.meGreen) +
              (filledSquaresGreen ? pb.mfGreen : pb.meGreen) +
              (filledSquaresGreen ? pb.mfGreen : pb.meGreen) +
              (filledSquaresRed ? pb.mfRed : pb.meRed) +
              (filledSquaresRed ? pb.mfRed : pb.meRed) +
              (filledSquaresRed ? pb.mfRed : pb.meRed) +
              (filledSquaresRed ? pb.mfRed : pb.meRed) +
              (filledSquaresRed ? pb.mfRed : pb.meRed) +
              (filledSquaresRed ? pb.mfRed : pb.meRed) +
              (filledSquaresRed ? pb.mfRed : pb.meRed) +
              (filledSquaresRed ? pb.rfRed : pb.reRed);

    const results = [];
    results.push(
        `:thumbsup: ${upvotes.length} upvotes (${upPercentage.toFixed(1)}%) • :thumbsdown: ${downvotes.length} downvotes (${downPercentage.toFixed(1)}%)`
    );
    results.push(progressBar);

    return results.join('\n');
}

module.exports = formatResults;
