export const TaskTestList = [
  {
    id: "pagination",
    label: "Paginate search results",
    subtasks: [
      {
        id: "limit",
        label: "Search results are limited to 10 results per page",
        test: async (ctx) => {
          return ctx.querySelectorAll("ul li").length === 10;
        }
      },
      {
        id: "previous-page-disabled",
        label: `The "Previous Page" button is disabled when on the first page`,
        test: async (ctx, { click, findByText }) => {
          let nextPage = findByText("button", "Next Page");
          let previousPage = findByText("button", "Previous Page");
          // Previous button should be disabled
          if (!previousPage.disabled) {
            return false;
          }

          await click(nextPage);

          if (previousPage.disabled) {
            return false;
          }
          await click(previousPage);

          return !!previousPage.disabled;
        }
      },
      {
        id: "next-page-disabled",
        label: `The "Next Page" button is disabled when on the last page`,
        test: async (ctx, { click, findByText }) => {
          let nextPage = findByText("button", "Next Page");
          let previousPage = findByText("button", "Previous Page");

          for (let i = 0, len = data.length / 10; i < len - 1; i++) {
            if (nextPage.disabled) {
              return false;
            }
            await click(nextPage);
          }

          if (!nextPage.disabled) {
            return false;
          }
          await click(previousPage);

          return !nextPage.disabled;
        }
      },
      {
        id: "data-updated",
        label: `Search results are split up per page`,
        test: async (ctx, { click, findByText }) => {
          let nextPage = findByText("button", "Next Page");
          let previousPage = findByText("button", "Previous Page");

          for (let i = 0, len = data.length / 10; i < len; i++) {
            if (!findByText("h3", data[i * 10].hed || data[i * 10].name)) {
              return false;
            }
            if (i < len - 1) {
              if (
                findByText(
                  "h3",
                  data[(i + 1) * 10].hed || data[(i + 1) * 10].name
                )
              ) {
                return false;
              }
            }
            await click(nextPage);
          }

          for (let i = data.length / 10 - 1; i >= 0; i--) {
            if (!findByText("h3", data[i * 10].hed || data[i * 10].name)) {
              return false;
            }
            await click(previousPage);
          }
          return true;
        }
      }
    ]
  },
  {
    id: "select-and-hide",
    label: "Results can be selected and 'hidden'",
    subtasks: [
      {
        id: "selections",
        label: "Clicking select checkbox on result applies a selected state",
        test: async (ctx, { click }) => {
          let result = ctx.querySelector("li");
          if (result == null) return false;
          let checkbox =
            result && result.querySelector('input[type="checkbox"]');
          if (checkbox.checked) {
            let isCompleted = result.classList.contains("selected");
            await click(checkbox);
            return isCompleted && !result.classList.contains("selected");
          } else {
            let isCompleted = !result.classList.contains("selected");
            await click(checkbox);
            return isCompleted && result.classList.contains("selected");
          }
        }
      },
      {
        id: "hide-results-showing",
        label:
          "A 'Hide from Search' button is shown when any results are selected",
        test: async (ctx, { click, findByText }) => {
          let checkboxes = ctx.querySelectorAll("li input:checked");
          if (checkboxes.length) {
            let isShowing = !!findByText("button", "Hide from Search");
            for (let checkbox of checkboxes) {
              await click(checkbox);
            }
            return isShowing && !findByText("button", "Hide from Search");
          } else {
            let isNotShowing = !findByText("button", "Hide from Search");
            await click(ctx.querySelector("li input"));
            return isNotShowing && !!findByText("button", "Hide from Search");
          }
        }
      },
      {
        id: "hide-results",
        label:
          "A 'hidden' state is applied to selected results after clicking 'Hide from Search'",
        test: async (ctx, { click, findByText }) => {
          let checkboxes = ctx.querySelectorAll("li input:checked");
          for (let checkbox of checkboxes) {
            await click(checkbox);
          }
          let title = findByText("h3", data[0].hed || data[0].name);
          let result = title.parentElement.parentElement;
          let checkbox =
            result && result.querySelector('input[type="checkbox"]');
          await click(checkbox);

          let hideButton = findByText("button", "Hide from Search");
          await click(hideButton);
          return !findByText("h3", data[0].hed || data[0].name);
        }
      }
    ]
  },
  {
    id: "bulk",
    label: "Select All / Select None",
    subtasks: [
      {
        id: "select-all",
        label: "Select All checkbox selects all results (on page)",
        test: async (ctx, { click }) => {
          let selectAll = ctx.querySelector("header input[type='checkbox']");
          if (selectAll == null) {
            return false;
          }
          await click(selectAll);
          return (
            ctx.querySelectorAll("li:not(.selected)").length === 0 &&
            selectAll.checked === true
          );
        }
      },
      {
        id: "select-none",
        label:
          "Deselecting Select All checkbox deselects all results (on page)",
        test: async (ctx, { click }) => {
          let selectAll = ctx.querySelector("header input[type='checkbox']");
          if (selectAll == null) {
            return false;
          }
          for (let checkbox of ctx.querySelectorAll(
            "li:not(.selected) input"
          )) {
            await click(checkbox);
          }

          await click(selectAll);
          return (
            ctx.querySelectorAll("li.selected").length === 0 &&
            selectAll.checked === false
          );
        }
      },
      {
        id: "select-some",
        label:
          "Select All checkbox shows indeterminate state when some but not all results are selected (on page)",
        test: async (ctx, { click }) => {
          let selectAll = ctx.querySelector("header input[type='checkbox']");
          if (selectAll == null) {
            return false;
          }
          await click(selectAll);
          await click(ctx.querySelector("li.selected input"));
          return selectAll.indeterminate;
        }
      }
    ]
  }
];
