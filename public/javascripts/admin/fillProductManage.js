(function ($) {
  $(function () {
    window.fs_test = $("#gender").fSelect({
      placeholder: "성별",
      numDisplayed: 2,
      overflowText: "{n} selected",
      noResultsText: "No results found",
      searchText: "Search",
      showSearch: false,
    });
    window.fs_test = $("#age").fSelect({
      placeholder: "연령",
      numDisplayed: 2,
      overflowText: "{n} selected",
      noResultsText: "No results found",
      searchText: "Search",
      showSearch: false,
    });
    window.fs_test = $("#price").fSelect({
      placeholder: "가격대",
      numDisplayed: 2,
      overflowText: "{n} selected",
      noResultsText: "No results found",
      searchText: "Search",
      showSearch: false,
    });
    window.fs_test = $("#category").fSelect({
      placeholder: "카테고리",
      numDisplayed: 2,
      overflowText: "{n} selected",
      noResultsText: "No results found",
      searchText: "Search",
      showSearch: false,
    });
    filter();
    document.getElementById("btn-filter").addEventListener("click", () => {
      filter();
    });
  });
})(jQuery);

function filter() {
  let container = $("#pagination");
  container.pagination({
    pageSize: 5,
    dataSource: function (done) {
      let genders = $("#gender option:selected")
        .map(function () {
          return this.value;
        })
        .get();

      let ages = $("#age option:selected")
        .map(function () {
          return this.value;
        })
        .get();

      let prices = $("#price option:selected")
        .map(function () {
          return this.value;
        })
        .get();

      let categories = $("#category option:selected")
        .map(function () {
          return this.value;
        })
        .get();

      axios({
        url: "/admin/product/filter",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          gender: genders,
          age: ages,
          price: prices,
          category: categories,
          _csrf: $("#_csrf").val(),
        }),
      })
        .then((res) => {
          $("#product_list").empty();
          var dataHtml = "";
          const products = res.data.products;
          console.log(products);
          $.each(products, function (index, product) {
            const count = res.data.count[index];
            dataHtml += `<tr> <td scope="col"><p>${product.id}</p></td>
            <td scope="col" style="width:200px"><p onclick="window.open('/admin/product/detail/${
              product.id
            }','상품수정','width=900,height=1000,left=500,top=50')">${
              product.name
            }</p></td>
            <td scope="col"><p>${product.Category?.value}</p></td>
            <td scope="col"><p><img src="${
              product.thumbnail
            }" alt="" style="width:100px; height: 100px;"/></p></td>
            <td scope="col"><p>${product.description}</p></td>
            <td scope="col"><p>${product.Brand?.value}</p></td>
            <td scope="col"><p>${count.view_count}</p></td>
            <td scope="col"><p>${count.like_count}</p></td>
            <td scope="col"><p>${count.order_count}</p></td>
            <td scope="col">
            ${
              product.deleted == 1
                ? "판매 중단됨"
                : '<button type="button" class="btn btn-light" id="${product.id}">판매중단</button>'
            }
            
            
            </td></tr>`;
          });
          $("#product_list").append(dataHtml);

          const buttons = document.getElementsByClassName("btn-light");
          Array.from(buttons).forEach((elem) => {
            elem.addEventListener("click", (e) => {
              if (confirm("정말 삭제하시겠습니까?")) {
                deleteProduct(e.target.id);
                $(e.target).closest("tr").remove();
              }
            });
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  });
}

function deleteProduct(id) {
  axios({
    url: `/admin/product/${id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      product_id: id,
      _csrf: $("#_csrf").val(),
    }),
  })
    .then((res) => {
      alert("제품이 삭제되었습니다");
      window.location.reload();
    })
    .catch((err) => {
      alert("제품을 삭제하지 못했습니다.");
      console.log(err.error);
    });
}
