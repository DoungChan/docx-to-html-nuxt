<template>
  <div class="h-screen flex items-center justify-center bg-gray-100">
    <div class="drop-box flex flex-col justify-center items-center gap-2" :class="{ 'dragover': dragging }"
      @click="pickFile" @dragover.prevent="dragging = true" @dragleave.prevent="dragging = false"
      @drop.prevent="onDrop">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-file-code-icon lucide-file-code">
        <path
          d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
        <path d="M10 12.5 8 15l2 2.5" />
        <path d="m14 12.5 2 2.5-2 2.5" />
      </svg>
      <h3>Drop DOCX here or click to select</h3>
      <input ref="fileInput" type="file" hidden accept=".docx" @change="onFileChange" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const fileInput = ref(null);
const dragging = ref(false);

const pickFile = () => fileInput.value.click();

const onDrop = (e) => {
  dragging.value = false;
  uploadFile(e.dataTransfer.files[0]);
};

const onFileChange = (e) => uploadFile(e.target.files[0]);

const uploadFile = async (file) => {
  if (!file || !file.name.endsWith(".docx")) {
    alert("Only .docx files allowed");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const blob = await $fetch("/api/convert", {
      method: "POST",
      body: formData,
      responseType: "blob",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(".docx", ".html");
    a.click();
  } catch {
    alert("Conversion failed");
  }
};
</script>

<style scoped>
.drop-box {
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  border: 2px dashed #999;
  text-align: center;
  width: 360px;
  cursor: pointer;

}

.drop-box.dragover {

  border-color: #000;
  background: #fafafa;
}
</style>
