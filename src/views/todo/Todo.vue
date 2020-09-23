<template>
  <div class="board">
    <div class="lane">
      <div class="lane-title"><h2>Backlog</h2></div>

      <Container
        group-name="trello"
        @drag-start="handleDragStart('backlog', $event)"
        @drop="handleDrop('backlog', $event)"
        :get-child-payload="getChildPayload"
        :animation-duration="600"
      >
        <Draggable v-for="log in cards.backlog" :key="log.id">
          <Card>
            {{ log.text }}
          </Card>
        </Draggable>
      </Container>
    </div>
    <div class="lane">
      <div class="lane-title">
        <h2>Desenvolvimento</h2>
      </div>

      <Container
        group-name="trello"
        @drag-start="handleDragStart('dev', $event)"
        @drop="handleDrop('dev', $event)"
        :get-child-payload="getChildPayload"
        :animation-duration="600"
      >
        <Draggable v-for="log in cards.dev" :key="log.id">
          <Card>
            {{ log.text }}
          </Card>
        </Draggable>
      </Container>
    </div>
    <div class="lane">
      <div class="lane-title">
        <h2>Testes</h2>
      </div>
      <Container
        group-name="trello"
        @drag-start="handleDragStart('testes', $event)"
        @drop="handleDrop('testes', $event)"
        :get-child-payload="getChildPayload"
        :animation-duration="600"
      >
        <Draggable v-for="log in cards.testes" :key="log.id">
          <Card>
            {{ log.text }}
          </Card>
        </Draggable>
      </Container>
    </div>
    <div class="lane">
      <div class="lane-title">
        <h2>Fechado</h2>
      </div>
      <Container
        group-name="trello"
        @drag-start="handleDragStart('fechados', $event)"
        @drop="handleDrop('fechados', $event)"
        :get-child-payload="getChildPayload"
        :animation-duration="600"
      >
        <Draggable v-for="log in cards.fechados" :key="log.id">
          <Card>
            {{ log.text }}
          </Card>
        </Draggable>
      </Container>
    </div>
  </div>
</template>

<script>
import Card from "../../components/Card";
import dados from "../../dados";
import { Container, Draggable } from "vue-smooth-dnd";
export default {
  components: {
    Card,
    Container,
    Draggable,
  },
  data: () => ({
    cards: {
      backlog: dados.backlog,
      dev: dados.dev,
      testes: dados.testes,
      fechados: [],
    },
    draggingCard: {
      lane: "",
      index: -1,
      cardData: {},
    },
  }),
  methods: {
    handleDragStart(lane, dragResult) {
      if (dragResult.isSource) {
        this.draggingCard = {
          lane: lane,
          index: dragResult.payload.index,
          cardData: {
            ...this.cards[lane][dragResult.payload.index],
          },
        };
        /*   this.cards[lane].splice(dragResult.payload.index, 1); */
      }
    },
    handleDrop(lane, dragResult) {
      const { removedIndex, addedIndex } = dragResult;
      if (lane === this.draggingCard.lane && removedIndex === addedIndex) {
        return;
      }
      if (removedIndex != null) {
        this.cards[lane].splice(removedIndex, 1);
      }
      if (addedIndex != null) {
        if (lane == "fechados" && this.cards.fechados === undefined) {
          this.cards.fechados = [];
        }
        this.cards[lane].splice(addedIndex, 0, this.draggingCard.cardData);
      }
    },
    getChildPayload(index) {
      return {
        index,
      };
    },
  },
};
</script>

<style>
.board {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.lane {
  background-color: #ddddddce;
  width: 20rem;
  border-radius: 0.8rem;
  box-shadow: 0 0.1rem 0.2rem 0 rgba(33, 33, 33, 33);
  margin: 0 0.8rem;
  padding: 0 0.7rem;
}

.lane-title {
  margin-top: 0.2rem;
  display: flex;
  justify-content: center;
  margin-bottom: 0.6rem;
}
</style>
