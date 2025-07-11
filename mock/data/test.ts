import Mock from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/vue-element-admin/test/imgList',
    method: 'post',
    response: () => {
      return {
        code: 20000,
        data: [
          { url: 'https://picsum.photos/id/1/300/450', text: 'Tall image 1 (450px)' },
          { url: 'https://picsum.photos/id/2/300/320', text: 'Medium image 2 (320px)' },
          { url: 'https://picsum.photos/id/3/300/600', text: 'Extra tall image 3 (600px)' },
          { url: 'https://picsum.photos/id/4/300/280', text: 'Short image 4 (280px)' },
          { url: 'https://picsum.photos/id/5/300/380', text: 'Medium image 5 (380px)' },
          { url: 'https://picsum.photos/id/6/300/250', text: 'Short image 6 (250px)' },
          { url: 'https://picsum.photos/id/7/300/420', text: 'Tall image 7 (420px)' },
          { url: 'https://picsum.photos/id/8/300/350', text: 'Medium image 8 (350px)' },
          { url: 'https://picsum.photos/id/9/300/500', text: 'Tall image 9 (500px)' },
          { url: 'https://picsum.photos/id/10/300/230', text: 'Short image 10 (230px)' },
          { url: 'https://picsum.photos/id/11/300/410', text: 'Tall image 11 (410px)' },
          { url: 'https://picsum.photos/id/12/300/290', text: 'Short image 12 (290px)' },
          { url: 'https://picsum.photos/id/13/300/370', text: 'Medium image 13 (370px)' },
          { url: 'https://picsum.photos/id/14/300/480', text: 'Tall image 14 (480px)' },
          { url: 'https://picsum.photos/id/15/300/330', text: 'Medium image 15 (330px)' },
          { url: 'https://picsum.photos/id/16/300/550', text: 'Extra tall image 16 (550px)' },
          { url: 'https://picsum.photos/id/17/300/270', text: 'Short image 17 (270px)' },
          { url: 'https://picsum.photos/id/18/300/390', text: 'Medium image 18 (390px)' },
          { url: 'https://picsum.photos/id/19/300/440', text: 'Tall image 19 (440px)' },
          { url: 'https://picsum.photos/id/20/300/310', text: 'Medium image 20 (310px)' },
          // 替换21-30为可访问的图片源
          { url: 'https://picsum.photos/id/101/300/260', text: 'Nature image 21 (260px)' },
          { url: 'https://picsum.photos/id/102/300/430', text: 'Mountain image 22 (430px)' },
          { url: 'https://picsum.photos/id/103/300/340', text: 'Forest image 23 (340px)' },
          { url: 'https://picsum.photos/id/104/300/510', text: 'River image 24 (510px)' },
          { url: 'https://picsum.photos/id/90/300/240', text: 'Flower image 25 (240px)' },
          { url: 'https://picsum.photos/id/106/300/360', text: 'City image 26 (360px)' },
          { url: 'https://picsum.photos/id/107/300/490', text: 'Beach image 27 (490px)' },
          { url: 'https://picsum.photos/id/108/300/300', text: 'Square image 28 (300px)' },
          { url: 'https://picsum.photos/id/109/300/380', text: 'Sunset image 29 (380px)' },
          { url: 'https://picsum.photos/id/110/300/220', text: 'Animal image 30 (220px)' },
          // 继续剩余图片
          { url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&h=470', text: '苏格兰高地 (470px)' },
          { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=330', text: '落基山脉 (330px)' },
          { url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=300&h=270', text: '森林营地 (270px)' },
          { url: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=300&h=520', text: '山间云雾 (520px)' },
          { url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&h=350', text: '雪山湖泊 (350px)' },
          { url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=410', text: '春日花田 (410px)' },
          { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=290', text: '雾中森林 (290px)' },
          { url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300&h=460', text: '热带雨林 (460px)' },
          { url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=300&h=380', text: '林间晨曦 (380px)' },
          { url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=300&h=240', text: '山野小路 (240px)' },
          { url: 'https://picsum.photos/id/41/300/430', text: 'Tall image 41 (430px)' },
          { url: 'https://picsum.photos/id/42/300/280', text: 'Short image 42 (280px)' },
          { url: 'https://picsum.photos/id/43/300/370', text: 'Medium image 43 (370px)' },
          { url: 'https://picsum.photos/id/44/300/510', text: 'Extra tall image 44 (510px)' },
          { url: 'https://picsum.photos/id/45/300/320', text: 'Medium image 45 (320px)' },
          { url: 'https://picsum.photos/id/46/300/450', text: 'Tall image 46 (450px)' },
          { url: 'https://picsum.photos/id/47/300/260', text: 'Short image 47 (260px)' },
          { url: 'https://picsum.photos/id/48/300/390', text: 'Medium image 48 (390px)' },
          { url: 'https://picsum.photos/id/49/300/480', text: 'Tall image 49 (480px)' },
          { url: 'https://picsum.photos/id/50/300/340', text: 'Medium image 50 (340px)' },
        ],
      }
    },
  },
  {
    url: '/vue-element-admin/test/textList',
    method: 'post',
    response: () => {
      const data = []
      for (let i = 0; i < 1000; i++) {
        data.push({
          id: i + 1,
          value: Mock.Random.paragraph(),
        })
      }
      return {
        code: 20000,
        data,
      }
    },
  },
] as MockMethod[]
