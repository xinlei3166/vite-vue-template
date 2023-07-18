<template>
  <Row :gutter="8">
    <Col span="8">
      <FormItem :prop="provinceKey">
        <Select v-model="model[provinceKey]" placeholder="请选择省">
          <Option
            v-for="province in provinces.province"
            :key="province.dicValue"
            :value="province.dicValue"
            @click.prevent="onClickPCA(province.id, 'city')"
          >
            {{ province.dicName }}
          </Option>
        </Select>
      </FormItem>
    </Col>
    <Col span="8">
      <FormItem :prop="cityKey">
        <Select v-model="model[cityKey]" placeholder="请选择市">
          <Option
            v-for="city in cities.city"
            :key="city.dicValue"
            :value="city.dicValue"
            @click.prevent="onClickPCA(city.id, 'area')"
          >
            {{ city.dicName }}
          </Option>
        </Select>
      </FormItem>
    </Col>
    <Col span="8">
      <FormItem :prop="areaKey">
        <Select v-model="model[areaKey]" placeholder="请选择区">
          <Option v-for="area in areas.area" :key="area.dicValue" :value="area.dicValue">
            {{ area.dicName }}
          </Option>
        </Select>
      </FormItem>
    </Col>
  </Row>
</template>

<script lang="ts" setup>
import { ref, computed, watch, toRefs } from 'vue'
import { getProvinceCityAreaList } from '@/api'
import { useSelectSearch } from '@packages/hooks'

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
const { options: provinces, onTrigger: onSearchProvince } = useSelectSearch(getProvinceCityAreaList)
const { options: cities, onTrigger: onSearchCity } = useSelectSearch(getProvinceCityAreaList)
const { options: areas, onTrigger: onSearchArea } = useSelectSearch(getProvinceCityAreaList)

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

<style scoped lang="less"></style>
