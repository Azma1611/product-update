body {
  margin: 0;
  background: #f2f2f2;
  font-family: Arial, sans-serif;
}

.app {
  max-width: 420px;
  margin: auto;
  padding: 15px;
  background: white;
  min-height: 100vh;
}

h2 {
  text-align: center;
  margin-bottom: 15px;
}

textarea {
  width: 100%;
  height: 120px;
  font-size: 16px;
  padding: 10px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 14px;
  font-size: 18px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  margin: 12px 0;
  cursor: pointer;
}

button:active {
  transform: scale(0.98);
}

.table-box {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.up {
  color: green;
  font-weight: bold;
}

.down {
  color: red;
  font-weight: bold;
}

.row {
  animation: slideUp 0.6s ease forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
