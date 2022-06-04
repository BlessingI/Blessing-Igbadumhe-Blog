async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();

  const content_text = document
    .querySelector('input[name="post-content"]')
    .value.trim();
  
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  console.log(content_text);
  console.log(title)
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editFormHandler);
