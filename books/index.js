const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

 console.log(__dirname); // ----- абсолютный путь к папке

 const booksPath = path.join(__dirname, "books.json"); // - join правильно соединяет пути
// const booksPath = path.resolve("books","books.json");  //---- возвращает путь относительно корневой папки (просто к имени файла добавляется путь к папке)
// console.log(booksPath);

const getAll = async() => {
    const data = await fs.readFile(booksPath, "utf-8");
    return JSON.parse(data);
}

const getById = async(id) => {
    const books = await getAll();
    const result = books.find(item => item.id === id)
    return result || null;
}

const add = async({title, author}) => {
    const books = await getAll();
    const newBook = {
        id: nanoid(),
        title,
        author,
    };
    books.push(newBook);
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
    return newBook;
}

const updateById =  async (id, data) => {
    const books = await getAll();
    const index = books.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    books[index] = {id, ...data};
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
    return books[index];
}

const deleteById = async (id) => {
    const books = await getAll();
    const index = books.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    const [result] = books.splice(index, 1);
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
    return result;


}

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    deleteById,
}