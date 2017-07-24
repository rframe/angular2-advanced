import { VoteComponent } from './vote.component';

// State change pattern
describe('VoteComponent', () => {
  let component: VoteComponent;

  // Before each of the test n times
  beforeEach(() => {
    // Set Up
    component = new VoteComponent();
  });
  // After each of the test n times
  afterEach(() =>{
    // Tear down
  });

  //Before all tests once
  beforeAll(() => {});
  //After all tests once
  afterAll(() => {});

  it('should increment the totalVotes when upvted', () => {
    // Arrange, create system under test
    // let component = new VoteComponent();

    // ACT
    component.upVote();

    // Assert
    expect(component.totalVotes).toBe(1);
  });

  it('should decrement the totalVotes when downvted', () => {
    component.downVote();

    expect(component.totalVotes).toBe(-1);
  });
});
