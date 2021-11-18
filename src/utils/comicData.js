export const comicData = (title, tags, thumbnail, author, description) => {
    if (author === '' && description === '')
        return { 
            title: title,
            tagID: tags,
            thumbnail: thumbnail
        }
    if(author === '' && description !== '')
        return {
            title: title,
            tagID: tags,
            thumbnail: thumbnail,
            description: description
        }
    if (author !== '' && description === '')
        return {
            title: title,
            tagID: tags,
            thumbnail: thumbnail,
            author: author
        }
    if (author !== '' && description !== '')
        return {
            title: title,
            tagID: tags,
            thumbnail: thumbnail,
            author: author,
            description: description
        }
}