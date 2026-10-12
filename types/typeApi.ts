export type toDoApi={
  data: Data[],
  errors: [],
  statusCode: number
}


type Data= {
      id: number,
      isCompleted: boolean,
      images: Img[],
      name: string,
      description: string
    }




    type Img= {
          id: number,
          imageName: string
        }