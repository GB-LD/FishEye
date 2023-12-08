export class MediaLikesCounter {

    static getPageSumLike() {
        const sumPageLike = Array
        .from(document.querySelectorAll('#likesCount'))
        .map(item => parseInt(item.innerHTML, 10))
        .reduce((total, current) => total + current, 0);

        return sumPageLike;
    }

    updateNumberOfLikes(mediaCard, action) {
        if (action === 'INC') {
            mediaCard.likes = +1;   
        } else if (action === 'DEC'){
            mediaCard.likes = -1;
        }
    }
}