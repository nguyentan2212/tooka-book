import { setupAxios } from "../../../js";
var objectMapper = require("object-mapper");

export const GET_ALL_BOOKS_URL = "/api/book";
export const POST_BOOK_URL = "/api/book";
export const UPDATE_BOOK_URL = "/api/book/update";

export async function getAllBooks(){
    const result = await setupAxios().get(GET_ALL_BOOKS_URL)
    .then(({data}) => {
        var map = {
            "[].MaSach": "[].id",
            "[].TenSach": "[].title",
            "[].MaTacGia": "[].author.id",
            "[].TenTacGia": "[].author.name",
            "[].MaTheLoai": "[].category.id",
            "[].TenTheLoai": "[].category.name",
            "[].NhaXuatBan": "[].publisher",
            "[].NamXuatBan": "[].publishYear",
            "[].SoLuongTon": "[].stock",
            "[].DonGiaNhap": "[].price",
            "[].URL": "[].img",
          };
          const dest = objectMapper(data, map);
          return dest;
    })
    console.log(result);
    return result;
}

export function postBook(title, categoryId, publisher, publishYear, authorId, imageUrl){
    const result = setupAxios().post(POST_BOOK_URL,{
        TenSach: title,
        MaTheLoai: categoryId,
        NhaXuatBan: publisher,
        NamXuatBan: publishYear,
        MaTacGia: authorId,
        URL: imageUrl,
    });
    return result;
}

export function updateBook(book){
    console.log(book);
    const result = setupAxios().post(UPDATE_BOOK_URL, {
        MaSach: book.id,
        TenSach: book.title,
        MaTheLoai: book.categoryId,
        NhaXuatBan: book.publisher,
        NamXuatBan: book.publishYear,
        MaTacGia: book.authorId,
        URL: book.imageUrl,
    });
    return result;
}