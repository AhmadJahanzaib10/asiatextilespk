# 🧵 Product Management Dashboard (React + Node.js + Cloudinary)

This is a full-stack product management application built with **React**, **Express**, **MongoDB**, and **Cloudinary**. It allows admins to **add**, **edit**, **delete**, and **manage images** for products.

---

## ⚙️ Tech Stack

| Layer       | Tech                             |
|-------------|----------------------------------|
| Frontend    | React, React Router, Bootstrap   |
| Backend     | Node.js, Express.js              |
| Database    | MongoDB (Mongoose ODM)           |
| Media       | Cloudinary                       |
| Auth        | JWT-based authentication         |

---

## 🚀 Features

- Add new products with main and side images
- Edit products (title, description, images)
- Delete side images individually
- Upload new images and delete old ones using Cloudinary
- JWT authentication for protected routes
- Responsive admin dashboard UI with Bootstrap

---

## 🗂️ Project Structure

/client ← Frontend (React)
└── src/
├── pages/
├── components/
└── App.js

/server ← Backend (Node.js + Express)
├── routes/
├── models/
├── controllers/
└── middleware/

.env ← Environment variables
README.md ← You are here

# Routes Available

| Route Path      | Component       | Description                      |
| --------------- | --------------- | -------------------------------- |
| `/`             | `Home`          | Public landing page              |
| `/admin`        | `AdminPage`     | Admin dashboard overview         |
| `/admin/add`    | `AddProduct`    | Form to add a new product        |
| `/admin/modify` | `ModifyProduct` | Page to update existing products |
| `/admin/delete` | `DeleteProduct` | Page to remove existing products |
| `*` (Wildcard)  | `Home`          | Fallback for unknown routes      |


## 📸 Image Handling Logic

### ✅ Main Image

- **Previewing:**
  - If `mainImg` is a `File`, it is previewed using `URL.createObjectURL()`.
  - If it's a URL (from database), it is shown as-is in the UI.

- **Updating:**
  - When a new file is selected via the hidden file input, the `mainImg` state is updated like this:

    ```js
    setFormData(prev => ({
      ...prev,
      mainImg: file
    }));
    ```

- **Sending to Backend:**
  - In the `onSave()` function, if `mainImg` is present, it is appended to the `FormData` object before the API call:

    ```js
    if (formData.mainImg) {
      data.append('mainImg', formData.mainImg); // This can be a new File or an existing image
    }
    ```

## 🖼 Side Images

### 🔍 Previewing
Each image in `formData.sideImages` is either:
- A `URL` (existing image already stored), or
- A `File` object (newly selected)

The image is previewed like this:
```js
img instanceof File ? URL.createObjectURL(img) : img
```

### ➕ Adding More Images
When the user selects new images using the file input, the new files are appended to the current array of `sideImages`:

```js
setFormData(prev => ({
  ...prev,
  sideImages: [...prev.sideImages, ...newFiles],
}));
```

### ➕ Removing Side Images
Clicking the ❌ icon removes an image from the array based on its index:
 `sideImages`:

```js
setFormData(prev => ({
  ...prev,
  sideImages: prev.sideImages.filter((_, index) => index !== indexToRemove)
}));

```

