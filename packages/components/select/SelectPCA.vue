<template>
  <t-row :gutter="8">
    <t-col :span="3">
      <t-form-item :name="provinceKey">
        <t-select v-model="model[provinceKey]" placeholder="请选择省">
          <t-option
            v-for="province in provinces"
            :key="province.dicValue"
            :value="province.dicValue"
            @click.prevent="onClickPCA(province.id, 'city')"
          >
            {{ province.dicName }}
          </t-option>
        </t-select>
      </t-form-item>
    </t-col>
    <t-col :span="3">
      <t-form-item :name="cityKey">
        <t-select v-model="model[cityKey]" placeholder="请选择市">
          <t-option
            v-for="city in cities"
            :key="city.dicValue"
            :value="city.dicValue"
            @click.prevent="onClickPCA(city.id, 'area')"
          >
            {{ city.dicName }}
          </t-option>
        </t-select>
      </t-form-item>
    </t-col>
    <t-col :span="3">
      <t-form-item :name="areaKey">
        <t-select v-model="model[areaKey]" placeholder="请选择区">
          <t-option v-for="area in areas" :key="area.dicValue" :value="area.dicValue">
            {{ area.dicName }}
          </t-option>
        </t-select>
      </t-form-item>
    </t-col>
  </t-row>
</template>

<script lang="ts" setup>
import { ref, computed, watch, toRefs } from 'vue'
import { useSelectSearch } from '@packages/hooks'
// @ts-ignore
import { getProvinceCityAreaList } from '@/api'

const props = defineProps({
  model: { type: Object, default: () => ({}) },
  prop: {
    type: Object,
    default: () => ({
      province: 'administrativeDivisionProvinceCode',
      city: 'administrativeDivisionCityCode',
      area: 'administrativeDivisionAreaCode'
    })
  },
  apiProp: {
    type: Object,
    default: () => ({
      province: 'administrativeDivisionProvinceCodeId',
      city: 'administrativeDivisionCityCodeId',
      area: 'administrativeDivisionAreaCodeId'
    })
  },
  data: { type: Object, default: () => ({}) },
  visible: { type: Boolean, default: false }
})

// ====================== Hooks ======================
const { options: provinces, onTrigger: onSearchProvince } =
  useSelectSearch<any>(getProvinceCityAreaList)
const { options: cities, onTrigger: onSearchCity } = useSelectSearch<any>(getProvinceCityAreaList)
const { options: areas, onTrigger: onSearchArea } = useSelectSearch<any>(getProvinceCityAreaList)

// ====================== Lifecycle ======================
const visible = computed(() => props.visible)
const provinceKey = computed(() => props.prop.province)
const cityKey = computed(() => props.prop.city)
const areaKey = computed(() => props.prop.area)
const provinceAPIKey = computed(() => props.apiProp.province)
const cityAPIKey = computed(() => props.apiProp.city)

watch(visible, async val => {
  if (val) {
    const form = props.model
    form[provinceKey.value] = props.data[provinceKey.value]
    form[cityKey.value] = props.data[cityKey.value]
    form[areaKey.value] = props.data[areaKey.value]

    await onSearchProvince({
      dicTypes: ['province']
    })

    const provinceId = props.data[provinceAPIKey.value]
    if (provinceId) {
      await onClickPCA(provinceId, 'city')
    }

    const cityId = props.data[cityAPIKey.value]
    if (cityId) {
      await onClickPCA(cityId, 'area')
    }
  } else {
    provinces.value = []
    cities.value = []
    areas.value = []
  }
})

// ====================== Components ======================
// 省市区
const onClickPCA = async (parentId: number, key: string) => {
  const apis: any = {
    city: onSearchCity,
    area: onSearchArea
  }
  await apis[key]?.({ dicTypes: [key], parentId })
}
</script>

<style scoped lang="scss"></style>
