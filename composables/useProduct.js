// const apiFetch = $fetch.create({ baseURL: '/api/v1' })
// import { useMessage } from '~/store/useMessage'
// import { useStore } from '~/store/useStore'

// const store = useStore()
// const appMessage = useMessage()

const useFactory = () => {
  const state = reactive({
    params: {
      fields: 'name, slug, price, salePrice, permalink, categories, description, attributes, gallery, manageInventory',
    },
    categoryParams: {
      fields: 'name, slug, permalink, description, parent, gallery',
    },
    errorMsg: '',
  })

  const fetchAll = async (payload) => {
    state.errorMsg = null
    try {
      const response = await $fetch('/api/v1/products', { params: { ...state.params, ...payload } })
      return {
        docs: response.docs,
        count: response.count,
        totalCount: response.totalCount,
      }
    } catch (error) {
      state.errorMsg = error.data
      return false
    }
  }

  const fetchSingle = async (slug) => {
    state.errorMsg = null
    try {
      if (slug) {
        state.params.slug = slug
        const response = await $fetch('/api/v1/products', { params: { ...state.params, indexPage: false } })
        return response.docs[0]
      } else {
        return {
          name: '',
          attributes: [],
          categories: [],
          gallery: [],
          extraFields: [],
        }
      }
    } catch (error) {
      state.errorMsg = error.data
      return false
    }
  }

  const save = async (product) => {
    state.errorMsg = null
    let response = null
    try {
      if (!product.name || !product.price) {
        state.errorMsg = 'Product name and price are required'
        return false
      }
      if (product._id) {
        response = await $fetch('/api/v1/products', {
          method: 'PATCH',
          body: product,
          params: { id: product._id },
        })
      } else {
        response = await $fetch('/api/v1/products', {
          method: 'POST',
          body: product,
        })
      }
      return response
    } catch (error) {
      state.errorMsg = error.data
      return false
    }
  }

  const deleteSingle = async (id) => {
    state.errorMsg = null
    try {
      await $fetch('/api/v1/products', { method: 'DELETE', params: { id } })
      return true
    } catch (error) {
      state.errorMsg = error.data
      return false
    }
  }

  const fetchCategories = async () => {
    state.errorMsg = null
    try {
      const response = await $fetch('/api/v1/categories', { params: state.categoryParams })
      return response.docs
    } catch (error) {
      state.errorMsg = error.data
      return false
    }
  }

  // const fetchCount = async (params) => {
  //   state.errorMsg = ''
  //   const { data, error } = await useFetch(`/v1/${collection}/count`, {
  //     baseURL: state.baseURL,
  //     method: 'get',
  //     params: params,
  //   })
  //   if (error.value) {
  //     state.errorMsg = 'Error while fetching docs count'
  //     // appError.setSnackbar(true, state.errorMsg)
  //     return false
  //   } else {
  //     state.totalItemCount = data.value
  //     return data.value
  //   }
  // }

  // const fetchBySlug = async (slug, params) => {
  //   state.errorMsg = ''
  //   const { data, error } = await useFetch(`/v1/${collection}/`, {
  //     baseURL: state.baseURL,
  //     method: 'get',
  //     params: { ...params, slug },
  //     lazy: true,
  //   })
  //   if (error.value) {
  //     state.errorMsg = 'Error while fetching docs'
  //     // appError.setSnackbar(true, state.errorMsg)
  //     return false
  //   } else {
  //     state.selectedItem = data.value[0]
  //     return data.value
  //   }
  // }

  // const deleteById = async (id) => {
  //   state.errorMsg = ''
  //   try {
  //     await http.delete(`v1/${collection}/${id}`)
  //     const index = state.items.findIndex((el) => el._id == id)
  //     if (index !== -1) state.items.splice(index, 1)
  //     return true
  //   } catch (err) {
  //     // console.log('MyERROR', err.response)
  //     state.errorMsg = err.response.data.message || err.response.data.statusMessage
  //     // appError.setSnackbar(true, state.errorMsg)
  //     return false
  //   }
  // }

  return { state, fetchAll, fetchSingle, fetchCategories, save, deleteSingle }
}

export default useFactory
