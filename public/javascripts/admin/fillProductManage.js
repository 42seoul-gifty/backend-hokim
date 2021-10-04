import { pagenation } from "./pagenation.js";

(function ($) {
  $(function () {
    const sorts = document.getElementsByClassName("fa-sort");

    Array.from(sorts).forEach((elem) => {
      elem.addEventListener("click", (e) => {
        console.log(elem.id);
        if (elem.getAttribute("desc") == null) {
          filter(elem.id, "desc");
          elem.setAttribute("desc", "");
        } else {
          filter(elem.id, "asc");
          elem.removeAttribute("desc");
        }
      });
    });
    const queries = location.href.split("&");

    queries.forEach((elem) => {
      const data = elem.split("=");
      if (
        data.length == 1 ||
        data[0].includes("page") ||
        data[0].includes("value") ||
        data[0].includes("order") ||
        data[1] == ""
      )
        return 1;
      const values = data[1].split(",");

      values.forEach((val) => {
        $(`#${data[0]} option[value='${val}']`).prop("selected", true);
      });
    });

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

    filter(
      $(document.getElementById("page"))[0].getAttribute("value"),
      $(document.getElementById("page"))[0].getAttribute("order")
    );
    document.getElementById("btn-filter").addEventListener("click", () => {
      document.getElementById("page").textContent = 0;
      filter(
        $(document.getElementById("page"))[0].getAttribute("value"),
        $(document.getElementById("page"))[0].getAttribute("order")
      );
    });
  });
})(jQuery);

function filter(value, order) {
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
        url: `/admin/product/filter?page=${
          document.getElementById("page").textContent
        }&${value ? `value=${value}&order=${order}` : ""}`,
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
          $(document.getElementById("page"))[0].setAttribute("value", value);
          $(document.getElementById("page"))[0].setAttribute("order", order);

          $("#product_list").empty();

          var dataHtml = "";
          const products = res.data.products;
          $.each(products, function (index, product) {
            dataHtml += `
            <tr> <td scope="col"><p>${product.id}</p></td>
            <td scope="col"><p><img src="${
              product.thumbnail
            }" alt="" style="width:100px; height: 100px;"/></p></td>

            <td scope="col" style="width:200px"><p class="btn btn-light"
            onclick="location.href='/admin/product/detail/${product.id}'">${
              product.name
            }</p></td>
            <td scope="col"><p>${product.Category?.value}</p></td>
            <td scope="col"><p>${product.Brand?.value}</p></td>
            <td scope="col"><p>${product.view_count}</p></td>
            <td scope="col"><p>${product.like_count}</p></td>
            <td scope="col"><p>${product.order_count}</p></td>
            <td scope="col">
            ${
              product.deleted == 1
                ? `<button type="button" class="btn blue-button restore-btn" id="${product.id}">판매재개</button>`
                : `<button type="button" class="btn red-button delete-btn" id="${product.id}">판매중단</button>`
            }
            
            
            </td></tr>`;
          });
          $("#product_list").append(dataHtml);
          pagenation(
            "/admin/product/manage",
            res.data.page,
            res.data.totalPage,
            () => {
              var result = "";
              const categories = ["gender", "age", "price", "category"];
              categories.forEach((elem) => {
                let values = $(`#${elem} option:selected`)
                  .map(function () {
                    return this.value;
                  })
                  .get();
                if (values.length > 0) result += `${elem}=${values.join(",")}&`;
              });
              result += `&value=${$(
                document.getElementById("page")
              )[0].getAttribute("value")}&order=${$(
                document.getElementById("page")
              )[0].getAttribute("order")}`;
              return result;
            }
          );

          const deleteButtons = document.getElementsByClassName("delete-btn");
          Array.from(deleteButtons).forEach((elem) => {
            elem.addEventListener("click", (e) => {
              if (confirm("정말 삭제하시겠습니까?")) {
                deleteProduct(e.target.id);
                $(e.target).closest("tr").remove();
              }
            });
          });

          const restoreButtons = document.getElementsByClassName("restore-btn");
          Array.from(restoreButtons).forEach((elem) => {
            elem.addEventListener("click", (e) => {
              if (confirm("정말 복구하시겠습니까?")) {
                restoreProduct(e.target.id);
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
    .catch((e) => {
      alert("제품을 삭제하지 못했습니다.");

      console.log(e.response.data.error);
    });
}

function restoreProduct(id) {
  axios({
    url: `/admin/product/${id}`,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      product_id: id,
      _csrf: $("#_csrf").val(),
    }),
  })
    .then((res) => {
      alert("제품이 복구되었습니다");
      window.location.reload();
    })
    .catch((e) => {
      alert("제품을 복구하지 못했습니다.");

      console.log(e.response.data.error);
    });
}
