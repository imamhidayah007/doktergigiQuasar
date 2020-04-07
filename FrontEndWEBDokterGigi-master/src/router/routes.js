
const routes = [
  {
    path: '/login',
    component: () => import('layouts/Guest.vue'),
    children: [
      {
        path: '', component: () => import('pages/guest/Login.vue')
      }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/Guest.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/guest/Register.vue')
      }
    ]
  },
  {
    path: '/successregister/:token',
    component: () => import('layouts/Guest.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/guest/AfterRegister.vue')
      }
    ]
  },
  {
    path: '/verf/:token',
    component: () => import('layouts/Guest.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/guest/VerfUrl.vue')
      }
    ]
  },
  // => auth route (user biasa)
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        name: 'Home',
        path: '',
        component: () => import('pages/user/Index.vue')
      }
    ],
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/create_event',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        name: 'CreateEvent',
        path: '',
        component: () => import('pages/user/CreateEvent.vue')
      }
    ],
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/my_event',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        name: 'MyEvent',
        path: '',
        component: () => import('pages/user/MyEvent.vue')
      }
    ],
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/edit/:id',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/user/FormEdit.vue') }
    ],
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/info/:id',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/user/InfoEvent.vue') }
    ],
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/detailevent/:id',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/user/DetailEvent.vue') }
    ],
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/keranjang',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        name: 'Cart',
        path: '',
        component: () => import('pages/user/Keranjang.vue')
      }
    ],
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/yourevent',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        name: 'YourEvent',
        path: '',
        component: () => import('pages/user/IkutAcara.vue')
      }
    ],
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/profile',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/user/Profile.vue') }
    ],
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/promosidetail/:id',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/user/Promosi.vue') }
    ],
    meta: {
      requiredAuth: true
    }
  },
  // ===> admin route
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/Index.vue') }
    ],
    meta: {
      requiredAdmin: true
    }
  },
  {
    path: '/addbanner',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/AddBanner.vue') }
    ],
    meta: {
      requiredAdmin: true
    }
  },
  {
    path: '/getdetailuser/:id',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/DetailUser.vue') }
    ],
    meta: {
      requiredAdmin: true
    }
  },
  {
    path: '/addpromosi',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/AddPromosi.vue') }
    ],
    meta: {
      requiredAdmin: true
    }
  },
  {
    path: '/listpromosi',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/ListPromosi.vue') }
    ],
    meta: {
      requiredAdmin: true
    }
  },
  {
    path: '/detailpromosi/:id',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/DetailPromosi.vue') }
    ],
    meta: {
      requiredAdmin: true
    }
  },
  {
    path: '/404',
    component: () => import('pages/Error404.vue')
  },
  {
    path: '/editpromosi/:id',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/EditPromosi.vue') }
    ],
    meta: {
      requiredAdmin: true
    }
  },
  {
    path: '/404',
    component: () => import('pages/Error404.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
