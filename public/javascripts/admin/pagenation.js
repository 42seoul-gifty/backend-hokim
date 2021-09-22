function pagenation(link, page, totalPage, options) {
  const pageContainer = document.getElementById("page-container");
  $(pageContainer).empty();
  var innerHTML = "";
  page = parseInt(page);
  var start = page - 2 < 0 ? 0 : page - 2;

  var last = page + 2 > totalPage ? totalPage : page + 2;

  if (page - 2 < 0) last -= page - 2;

  if (page + 2 > totalPage)
    start =
      start - (page + 2 - totalPage) < 0 ? 0 : start - (page + 2 - totalPage);

  if (start > 0)
    innerHTML += `<a class = "btn blue-border-button" href= '${link}?page=${0}&${options()}' style="margin: 5px"> < </a>`;
  for (var i = start; i <= last && i <= totalPage; i++) {
    if (i == page)
      innerHTML += `<a class = "btn blue-button" href='${link}?page=${i}&${options()}' style="margin: 5px"> ${
        i + 1
      } </a>`;
    else
      innerHTML += `<a class = "btn blue-border-button" href='${link}?page=${i}&${options()}' style="margin: 5px"> ${
        i + 1
      } </a>`;
  }
  if (totalPage > last)
    innerHTML += `<a class = "btn blue-border-button" href='${link}?page=${totalPage}&${options()}' style="margin: 5px"> > </a>`;

  $(pageContainer).append(innerHTML);
}

export { pagenation };
