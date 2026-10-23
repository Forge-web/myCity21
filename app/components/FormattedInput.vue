<script setup>
const props = defineProps({
	modelValue: { type: [String, Number], default: '' },
	label: { type: String, default: '' },
	suffix: { type: String, default: '' },
	placeholder: { type: String, default: '' },
	required: { type: Boolean, default: false },
	decimals: { type: Boolean, default: false }, // разрешать дробную часть
	maxDecimals: { type: Number, default: 2 },
})

const emit = defineEmits(['update:modelValue'])

const displayValue = computed(() => {
	const val = props.modelValue
	if (val === '' || val == null) return ''
	const [intPart, decPart] = String(val).split('.')
	const formatted = (intPart || '0').replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
	return decPart !== undefined ? `${formatted},${decPart}` : formatted
})

function onInput(e) {
	let raw = e.target.value.replace(/\s/g, '')

	if (props.decimals) {
		raw = raw.replace(/,/g, '.').replace(/[^\d.]/g, '')
		const [intPart, ...rest] = raw.split('.')
		const dec = rest.join('').slice(0, props.maxDecimals)
		raw = rest.length ? `${intPart}.${dec}` : intPart
	} else {
		raw = raw.replace(/\D/g, '')
	}

	emit('update:modelValue', raw)
}
</script>

<template>
	<div class="flex flex-col gap-1.5">
		<label v-if="label" class="text-sm font-medium text-gray-700">
			{{ label }}
		</label>
		<div class="relative">
			<input
				type="text"
				inputmode="decimal"
				:value="displayValue"
				:placeholder="placeholder"
				:required="required"
				@input="onInput"
				class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors duration-150 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
				:class="suffix ? 'pr-10' : ''"
			/>
			<span
				v-if="suffix"
				class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm font-medium text-gray-400"
			>
				{{ suffix }}
			</span>
		</div>
	</div>
</template>