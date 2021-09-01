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
          body: JSON.stringify({
            genders: genders,
            ages: ages,
            prices: prices,
            categories: categories,
          }),
        })
          .then((res) => {
            console.log(res.data);

            $("#product_list").empty();
            var dataHtml = "";
            const products = res.data.products;
            //<td scope="col"><p><img src="${product.thumbnail}" alt="" style="width:100px; height: 100px;"/></p></td>
            // <td scope="col"><p>${product.exposure_count}</p></td>

            $.each(products, function (index, product) {
              dataHtml += `<tr> <td scope="col"><p>${product.id}</p></td>
			  <td scope="col" style="width:200px"><p onclick="window.open('/admin/product/detail?product_code=${product.id}','상품수정','width=900,height=1000,left=500,top=50')">${product.name}</p></td>
			  <td scope="col"><p>${product.category}</p></td>
			  <td scope="col"><p><img src="${product.thumbnail}" alt="" style="width:100px; height: 100px;"/></p></td>
			  <td scope="col"><p>${product.description}</p></td>
			  <td scope="col"><p>${product.brand}</p></td>
			  <td scope="col"><p>${product.exposure_count}</p></td>
			  <td scope="col"><p>${product.love_count}</p></td>
			  <td scope="col"><p>${product.order_count}</p></td>
			  <td scope="col"><button type="button" class="btn btn-light" onclick="deleteProduct('${product.id}')">삭제</button></td></tr>`;
            });
            $("#product_list").append(dataHtml);
          })
          .catch((err) => {
            console.log(err.error);
          });
      },
    });
  });
})(jQuery);

function deleteProduct(product_code) {
  fetch("/admin/product", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_code: product_code,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res.data);
      if (res.data === "delete") {
        alert("제품이 삭제됐습니다");
        window.location.reload();
      }
    })
    .catch((err) => {
      alert(err.error);
      console.log(err.error);
    });
}
