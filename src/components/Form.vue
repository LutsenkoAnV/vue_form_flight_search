<template>
  <form class="form">
      <div class="form__check-buttons">
        <div class="form__check-buttons--left">
          <input
            name="round"
            type="radio"
            class="form__input-round"
            id="one-way"
            :value="true"
            v-model="roundTrip"
          />
          <label class="check-button" for="one-way">Round Trip</label>
          <input
            name="round"
            type="radio"
            class="form__input-single"
            id="round-way"
            :value="false"
            v-model="roundTrip"
          />
          <label class="check-button" for="round-way">One way</label>
          <input
            name="direct"
            type="checkbox"
            class="form__input-direct"
            id="direct-flight"
          />
          <label class="check-button" for="direct-flight">Direct flights only</label>
        </div>
        <input
          name="hotel"
          type="checkbox"
          class="form__input-hotels"
          id="find-hotel"
        />
        <label class="check-button" for="find-hotel">Find hotels</label>
      </div>
      <div class="form__details">
        <div class="cities">
          <input
            name="dispatch"
            class="form__details-dispatch"
            type="text"
            :value="selectedDispatch"
          />
          <input
            name="arrive"
            class="form__details-dispatch"
            type="text"
            :value="selectedArrive"
          />
          <div class="cities-dispatch">
            <v-select
              class="details-city select-start"
              :options="city"
              :value="selected"
              v-model="selectedDispatch"
            ></v-select>
            <img
              src="@/images/swap-horizontal-orientation-arrows.png"
              class="change-arrows"
              alt="change_cities"
              v-on:click="changeCities"
            >
          </div>
          <v-select
            class="details-city select-end"
            :options="city"
            :value="selected"
            v-model="selectedArrive"
          ></v-select>
        </div>
        <div class="calendar-container">
          <div class="calendar">
            <font-awesome-icon class="calendar-icon" icon="calendar-alt"/>
            <datepicker
              name="start"
              input-class="form__calendar"
              :disabled-dates="disabledDatesStart()"
              :highlighted="highlightedDates()"
              v-model="startDate"
            ></datepicker>
          </div>
          <div class="calendar">
            <font-awesome-icon class="calendar-icon" icon="calendar-alt"/>
            <datepicker
              name="end"
              input-class="form__calendar"
              :disabled-dates="disabledDatesEnd()"
              :highlighted="highlightedDates()"
              v-model="endDate"
              placeholder="Return"
              :clear-button="true"
              :disabled="!roundTrip"
            ></datepicker>
          </div>
        </div>
        <div class="container-seats">
          <label class="label label-passengers" v-on:click="seatsQuantity = !seatsQuantity">
            <font-awesome-icon class="passenger-icon" icon="user-plus"/>
            <input
              name="passengers"
              type="text"
              class="form__input-seats input-passengers"
              :value="adultsNumber + childrenNumber + infantsNumber + ', ' + selectClass "
            />
          </label>
          <div v-bind:class="{'passengers-active': seatsQuantity, 'passengers': !seatsQuantity}">
            <div class="people-age">
              <p class="title">Adults</p>
              <div class="passengers-numbers">
                <button
                  type="button"
                  class="count-button"
                  v-bind:disabled="adultsNumber === 1 ? true : false" v-on:click="adultsNumber--"
                >
                -
                </button>
                <span class="number">{{adultsNumber}}</span>
                <button type="button" class="count-button" v-on:click="adultsNumber++">
                +
                </button>
              </div>
            </div>
            <div class="people-age">
              <p class="title">Children (2-12)</p>
              <div class="passengers-numbers">
                <button
                  type="button"
                  class="count-button"
                  v-bind:disabled="childrenNumber === 0 ? true : false" v-on:click="childrenNumber--"
                >
                -
                </button>
                <span class="number">{{childrenNumber}}</span>
                <button type="button" class="count-button" v-on:click="childrenNumber++">
                +
                </button>
              </div>
            </div>
            <div class="people-age">
              <p class="title">Infants (0-2)</p>
              <div class="passengers-numbers">
                <button
                  type="button"
                  class="count-button"
                  v-bind:disabled="infantsNumber === 0 ? true : false" v-on:click="infantsNumber--"
                >
                -
                </button>
                <span class="number">{{infantsNumber}}</span>
                <button type="button" class="count-button" v-on:click="infantsNumber++">
                +
                </button>
              </div>
            </div>
            <select class="passengers-select" v-model="selectClass">
              <option value="Economy">Economy</option>
              <option value="Premium economy">Premium economy</option>
              <option value="Business">Business</option>
              <option value="First class">First class</option>
            </select>
          </div>
        </div>
        <button type="submit" class="button form__button">Search</button>
      </div>
    </form>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
  data () {
    return {
      startDate: new Date(),
      endDate: null,
      adultsNumber: 1,
      childrenNumber: 0,
      infantsNumber: 0,
      selectClass: 'Economy',
      seatsQuantity: false,
      roundTrip: true,
      selectedDispatch: '',
      selectedArrive: '',
      city: []
    }
  },
  methods: {
    disabledDatesStart () {
      return {
        to: new Date(new Date().setDate(new Date().getDate() - 1)),
        from: this.endDate && new Date(this.endDate.getTime())
      }
    },
    disabledDatesEnd () {
      return {
        to: new Date(this.startDate.getTime())

      }
    },
    highlightedDates () {
      return {
        to: this.endDate ? new Date(this.endDate.getTime()) : new Date(),
        from: new Date(this.startDate.getTime())
      }
    },
    changeCities () {
      const dispatch = this.selectedDispatch
      this.selectedDispatch = this.selectedArrive
      this.selectedArrive = dispatch
    },
    async getCities () {
      const response = await fetch('https://restcountries.eu/rest/v2/all')
      return response.json()
    }
  },
  mounted () {
    this.getCities().then(result => {
      const filtered = result.map(city => city.capital).sort().filter((city, index, arr) => city !== '' && city !== arr[index + 1])
      this.city = filtered
    })
  },
  components: {
    Datepicker
  }

}
</script>

<style scope>
   @import '~vue-select/dist/vue-select.css';
   @import './checkboxes.css';
   @import './destination.css';
   @import './datepicker.css';
   @import './seats.css';

  .form {
    box-sizing: border-box;
    max-width: 1142px;
    min-width: 320px;
    margin: 0 auto;
    height: 143px;
    padding: 17px 14px;
    font-family: "Myriad Pro";
    background-color: lightblue;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(100,100,100,0.5);
  }

  .form__details {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .form__button {
    width: 122px;
    min-width: 122px;
    height: 62px;
    margin-left: 1px;
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
    color: #fff;
    background: #3399ff;
    cursor: pointer;
    border-style: none;
    border-radius: 10px;
    outline: none;
  }

  .form__button:hover {
    color: #3399ff;
    background-color: #fff;
  }

  @media (max-width: 1155px) {
    .form {
      height: 215px;
    }

    .form__button {
      margin-top: 5px;
      width: 300px;
    }
  }

  @media (max-width: 1032px) {
    .cities {
      width: 100%;
    }

    .form__button {
      margin-top: 5px;
      margin-left: 20px;
      width: 122px;
    }

    .calendar, .label {
      margin-top: 5px;
    }

    .form__input-seats {
      border-radius: 0;
    }

    .details-city {
      width: 350px;
    }

    .select-start {
      border-radius: 0;
    }

    .change-arrows {
      right: 10px;
    }
  }

  @media (max-width: 750px) {
    .form {
      height: 345px;
    }

    .cities {
      flex-direction: column;
    }

    .details-city {
      width: 100%;
    }

    .change-arrows {
      right: 10px;
    }

    .calendar-container {
      display: flex;
      width: 100%;
      justify-content: center;
    }

    .form__calendar {
      width: 250px;
      max-width: 340px ;
    }

    .input-passengers {
      width: 355px;
      max-width: 355px;
    }
  }

  @media (max-width: 615px) {
    .form {
      height: 365px;
    }

    .form__details {
      margin-top: 50px;
    }

    .check-button:nth-child(2) {
      margin-bottom: 10px;
    }
  }

  @media (max-width: 543px) {
    .form {
      height: 525px;
    }

    .form__details {
      margin-top: 90px;
    }

    .check-button:nth-child(4) {
      margin-bottom: 10px;
    }

    .calendar-container {
      flex-direction: column;
    }

    .form__calendar {
      margin-top: -5px;
      width: 100%;
    }

    .label {
      display: flex;
      width: 100%;
    }

    .container-seats {
      width: 100%;
    }

    .input-passengers {
      margin-top: -5px;
      max-width: 341px;
    }

    .form__button {
      margin-right: 10px;
      width: 341px;
    }
  }
</style>
