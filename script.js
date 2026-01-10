/* General Body */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f2f2f2;
}

.app {
  max-width: 480px;
  margin: auto;
  padding: 15px;
  min-height: 100vh;
  background: white;
}

/* Headings */
h2 {
  text-align: center;
  margin-bottom: 10px;
}

/* Textarea */
textarea {
  width: 100%;
  height: 100px;
  font-size: 16px;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #ccc;
}

/* Buttons */
button {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
}

button:active {
  transform: scale(0.98);
}

.view-history-btn {
  background: #007bff;
  color: white;
}

.delete-btn {
  background: #e53935;
  color: white;
}

/* Animation Box */
.animation-box {
  min-height: 120px;
  margin: 10px 0;
  border: 1px solid #ccc;
  padding: 10px;
  background: #fdfdfd;
  border-radius: 10px;
  overflow: hidden;
}

/* History Section */
.history-box {
  margin-top: 10px;
}

/* Item Box */
.item-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: relative;
}

/* Item Data */
.item-data {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.item-data span {
  margin: 2px 0;
}

/* Status Colors */
.up {
  color: green;
  font-weight: bold;
}
.down {
  color: red;
  font-weight: bold;
}

/* 3-Dot Menu */
.menu {
  position: relative;
}

.menu-btn {
  font-size: 24px;
  cursor: pointer;
  padding: 0 10px;
  user-select: none;
}

.menu-content {
  display: none;
  position: absolute;
  right: 0;
  top: 28px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  min-width: 120px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  z-index: 10;
}

.menu-content button {
  width: 100%;
  padding: 8px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
}

.menu-content button:hover {
  background: #f2f2f2;
}

/* Animation */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-row {
  animation: fadeInUp 0.6s ease forwards;
}
