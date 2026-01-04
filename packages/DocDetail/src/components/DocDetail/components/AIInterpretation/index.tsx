import type { FC } from "react";
import type { DocDetailProps } from "../..";
import { Collapse } from "antd";

const AIInterpretation: FC<DocDetailProps> = (props) => {
  const { i18n } = props;

  return (
    <Collapse
      size="small"
      classNames={{
        root: "bg-transparent",
      }}
      items={[
        {
          key: "ai-interpretation",
          label: i18n?.labels?.aiInterpretation ?? "AI Interpretation",
          children: (
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad
              doloribus unde porro, est molestiae voluptates provident quam ex
              cumque quasi asperiores dicta vero. Ullam corrupti exercitationem
              rerum temporibus tempora fugit. Nihil impedit odit vel
              reprehenderit itaque voluptatum laborum dolore quae earum
              explicabo quibusdam laudantium officia, esse, recusandae ratione?
              Vero temporibus rem, quisquam facilis vel officia possimus nihil
              porro ad minus! Similique explicabo fugit consectetur modi nulla
              quasi unde vitae non eos, vel dolorem dolor voluptates veniam.
              Consectetur minima voluptatem quisquam ipsa facere! Maxime nam
              quae blanditiis architecto ipsa tempore qui. Pariatur earum
              debitis quis magnam temporibus impedit tempore reiciendis,
              exercitationem veritatis corrupti tempora et suscipit totam unde
              nulla quae perspiciatis molestiae harum dolores iusto corporis!
              Architecto explicabo facilis consequuntur neque. Fuga quisquam
              placeat fugit rerum nam laborum ad, debitis nemo magnam eius
              officia tenetur, ducimus incidunt velit assumenda nisi,
              praesentium perferendis quibusdam commodi! Ab tenetur minima ad
              quae aspernatur maiores! Nostrum rem voluptatibus ullam
              reiciendis, harum quod quas nesciunt id voluptatum natus quisquam?
              Quam rerum deleniti error labore impedit, molestiae sapiente
              maxime velit dolore. Cumque unde repellat eligendi nemo
              consectetur! Error porro non in! Inventore, numquam, quod quam
              tempore officiis placeat optio non ullam tenetur voluptates
              laborum ipsam dolores a eos vitae nemo saepe architecto culpa,
              soluta velit! Id, magni. Laborum consequuntur magni architecto
              velit, accusantium delectus alias, amet libero, voluptatibus iure
              fugit magnam corporis id quas ut suscipit necessitatibus ad nihil.
              Molestias nesciunt, dolore facere autem ratione voluptatum vero.
              Saepe, nihil asperiores necessitatibus delectus fugiat dolorem
              cum, temporibus fuga dolores ipsum officiis odio repellendus
              repudiandae similique incidunt quisquam. Beatae, illo! Iste
              mollitia dolor fuga repellendus, perferendis accusamus modi
              beatae! Ducimus repellat voluptate asperiores, accusantium omnis
              voluptatem beatae laudantium provident? Et sequi vel molestiae
              temporibus repellat nulla dolorem adipisci quod dignissimos
              aliquid! Assumenda, minima laboriosam. Voluptates amet nobis odit
              veritatis!Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Ad doloribus unde porro, est molestiae voluptates provident
              quam ex cumque quasi asperiores dicta vero. Ullam corrupti
              exercitationem rerum temporibus tempora fugit. Nihil impedit odit
              vel reprehenderit itaque voluptatum laborum dolore quae earum
              explicabo quibusdam laudantium officia, esse, recusandae ratione?
              Vero temporibus rem, quisquam facilis vel officia possimus nihil
              porro ad minus! Similique explicabo fugit consectetur modi nulla
              quasi unde vitae non eos, vel dolorem dolor voluptates veniam.
              Consectetur minima voluptatem quisquam ipsa facere! Maxime nam
              quae blanditiis architecto ipsa tempore qui. Pariatur earum
              debitis quis magnam temporibus impedit tempore reiciendis,
              exercitationem veritatis corrupti tempora et suscipit totam unde
              nulla quae perspiciatis molestiae harum dolores iusto corporis!
              Architecto explicabo facilis consequuntur neque. Fuga quisquam
              placeat fugit rerum nam laborum ad, debitis nemo magnam eius
              officia tenetur, ducimus incidunt velit assumenda nisi,
              praesentium perferendis quibusdam commodi! Ab tenetur minima ad
              quae aspernatur maiores! Nostrum rem voluptatibus ullam
              reiciendis, harum quod quas nesciunt id voluptatum natus quisquam?
              Quam rerum deleniti error labore impedit, molestiae sapiente
              maxime velit dolore. Cumque unde repellat eligendi nemo
              consectetur! Error porro non in! Inventore, numquam, quod quam
              tempore officiis placeat optio non ullam tenetur voluptates
              laborum ipsam dolores a eos vitae nemo saepe architecto culpa,
              soluta velit! Id, magni. Laborum consequuntur magni architecto
              velit, accusantium delectus alias, amet libero, voluptatibus iure
              fugit magnam corporis id quas ut suscipit necessitatibus ad nihil.
              Molestias nesciunt, dolore facere autem ratione voluptatum vero.
              Saepe, nihil asperiores necessitatibus delectus fugiat dolorem
              cum, temporibus fuga dolores ipsum officiis odio repellendus
              repudiandae similique incidunt quisquam. Beatae, illo! Iste
              mollitia dolor fuga repellendus, perferendis accusamus modi
              beatae! Ducimus repellat voluptate asperiores, accusantium omnis
              voluptatem beatae laudantium provident? Et sequi vel molestiae
              temporibus repellat nulla dolorem adipisci quod dignissimos
              aliquid! Assumenda, minima laboriosam. Voluptates amet nobis odit
              veritatis!
            </p>
          ),
        },
      ]}
    />
  );
};

export default AIInterpretation;
