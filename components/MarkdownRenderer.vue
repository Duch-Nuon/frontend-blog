// components/MarkdownRenderer.vue
<template>
  <div class="my-6 w-full h-full">
    <div class="markdown-body dark:bg-gray-900" ref="contentRef" v-html="renderedContent"></div>
  </div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import { computed, onMounted, onUnmounted, ref, nextTick, watch } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.min.css';

interface Props {
  content: string
}

const props = defineProps<Props>()
const contentRef = ref<HTMLDivElement | null>(null)

const md: MarkdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: (str: string, lang: string): string => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const highlighted = hljs.highlight(str, {
          language: lang,
          ignoreIllegals: true
        }).value
        return `<pre><code class="hljs language-${lang}">${highlighted}</code><div class="code-language-indicator">${lang}</div><button class="copy-button">Copy</button></pre>`
      } catch (__) {}
    }
    return `<pre><code class="hljs">${md.utils.escapeHtml(str)}</code><div class="code-language-indicator">${lang}</div><button class="copy-button">Copy</button></pre>`
  }
});

const renderedContent = computed((): string => {
  return md.render(props.content)
})

const setupCopyButtons = async (): Promise<void> => {
  await nextTick()

  if (!contentRef.value) return

  const codeBlocks = contentRef.value.querySelectorAll('pre')
  codeBlocks.forEach((block) => {
    const copyButton = block.querySelector('.copy-button')
    const codeElement = block.querySelector('code')

    if (!copyButton || !codeElement) return

    copyButton.addEventListener('click', async () => {
      try {
        const codeToCopy = codeElement.textContent?.replace(/Copy/g, '').trim() || ''
        await navigator.clipboard.writeText(codeToCopy)

        copyButton.textContent = 'Copied!'
        copyButton.classList.add('copied')

        setTimeout(() => {
          copyButton.textContent = 'Copy'
          copyButton.classList.remove('copied')
        }, 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
        copyButton.textContent = 'Error!'
        copyButton.classList.add('error')

        setTimeout(() => {
          copyButton.textContent = 'Copy'
          copyButton.classList.remove('error')
        }, 2000)
      }
    })
  })
}

watch(() => props.content, () => {
  setupCopyButtons()
})

onMounted(() => {
  setupCopyButtons()
})

onUnmounted(() => {
  if (!contentRef.value) return
  const copyButtons = contentRef.value.querySelectorAll('.copy-button')
  copyButtons.forEach(button => {
    button.removeEventListener('click', () => {})
  })
})
</script>

<style>
.markdown-body {
  background-color: white;
  font-size: 16px;
  line-height: 1.6;
  border-radius: 8px;
}

.markdown-body h1 {
  font-size: 2.5em;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1em;
}

.dark .markdown-body h1 {
  font-size: 2.5em;
  font-weight: bold;
  color: white;
  margin-bottom: 1em;
}

.markdown-body h2 {
  font-size: 2em;
  font-weight: bold;
  color: #34495e;
  margin: 1em 0;
}

.dark .markdown-body h2 {
  font-size: 2em;
  font-weight: bold;
  color: white;
  margin: 1em 0;
}

.markdown-body h3 {
  font-size: 1.5em;
  font-weight: bold;
  color: #4a6274;
  margin: 1em 0;
}

.markdown-body p,
.markdown-body li {
  font-size: 1.2em;
  color: #333;
  margin-bottom: 1em;
}

.dark .markdown-body p,
.dark .markdown-body li {
  font-size: 1.2em;
  color: white;
  margin-bottom: 1em;
}

.markdown-body ul,
.markdown-body ol {
  padding-left: 2em;
  margin-bottom: 1em;
}

.markdown-body code {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 0.9em;
  background-color: #f6f8fa;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  margin-top: 5px;
}

.markdown-body pre {
  position: relative;
  background-color: #f6f8fa;
  padding: 16px;
  border-radius: 6px;
  margin: 16px 0;
  overflow: auto;
}

.markdown-body pre {
  position: relative;
  background-color: #1e1e1e; /* Dark background */
  padding: 16px;
  border-radius: 6px;
  margin: 16px 0;
  overflow: auto;
  color: #d4d4d4; /* Light text color for better contrast */
  border: 1px solid #333; /* Optional: subtle border */
}

/* Update code block text color */
.markdown-body pre code {
  display: block;
  overflow-x: auto;
  padding: 0;
  background-color: transparent;
  font-size: 14px;
  line-height: 1.45;
  color: #d4d4d4; /* Light text color */
}

/* You might also want to update the inline code style */
.markdown-body code {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 0.9em;
  background-color: #2d2d2d; /* Darker background for inline code */
  color: #d4d4d4; /* Light text color */
  padding: 0.2em 0.4em;
  border-radius: 3px;
}

.markdown-body .hljs {
  background: transparent;
  padding: 0;
}

.markdown-body a {
  color: #3498db;
  text-decoration: none;
  transition: color 0.2s ease;
}

.markdown-body a:hover {
  color: #2980b9;
  text-decoration: underline;
}

.markdown-body blockquote {
  margin: 1em 0;
  padding-left: 1em;
  border-left: 4px solid #ddd;
  color: #666;
}

.markdown-body img {
  max-width: 100%;
  height: auto;
  margin: 1em 0;
  border-radius: 4px;
}

.copy-button {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 6px 12px;
  font-size: 12px;
  color: #ffffff;
  background-color: #3498db;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.8;
  transition: all 0.2s ease;
  z-index: 1;
}

.code-language-indicator {
  position: absolute;
  top: 0;
  left: 0;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  color: #ccc07b;
}

.copy-button:hover {
  opacity: 1;
  background-color: #2980b9;
}

.copy-button.copied {
  background-color: #27ae60;
}

.copy-button.error {
  background-color: #e74c3c;
}

/* Table styles */
.markdown-body table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}

.markdown-body th,
.markdown-body td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.markdown-body th {
  background-color: #f6f8fa;
  font-weight: bold;
}

.markdown-body tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* Horizontal rule */
.markdown-body hr {
  border: 0;
  height: 1px;
  background-color: #ddd;
  margin: 2em 0;
}

/* Mobile responsiveness */
@media (max-width: 767px) {
  .markdown-body {
    font-size: 14px;
  }

  .markdown-body pre {
    padding: 12px;
  }

  .markdown-body h1 {
    font-size: 2em;
  }

  .markdown-body h2 {
    font-size: 1.7em;
  }

  .markdown-body h3 {
    font-size: 1.4em;
  }

  .markdown-body p,
  .markdown-body li {
    font-size: 1.1em;
  }

  .copy-button {
    padding: 4px 8px;
    font-size: 11px;
  }
}
</style>