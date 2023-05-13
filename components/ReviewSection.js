import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

export default function ReviewSection({ userToken, gameId }) {
  const navigation = useNavigation();
  const [reviews, setReviews] = useState([]);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const fetchReviews = async () => {
        try {
          const resReviews = await axios.get(
            `https://site--gamepad-back--6h6hqnm2zbqs.code.run/reviews/game/${gameId}`
          );
          setReviews(resReviews.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchReviews();

      return () => {
        fetchReviews;
      };
    }, [])
  );

  const handleReviewSubmit = async ({ userToken }) => {
    try {
      const resReview = await axios.post(
        "https://site--gamepad-back--6h6hqnm2zbqs.code.run/review/create",
        {
          title: reviewTitle,
          comment: reviewComment,
          gameId: gameId,
        },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      setReviews([...reviews, resReview.data]);
      setReviewTitle("");
      setReviewComment("");
    } catch (error) {
      console.log(error);
      alert("You've already reviewed this game !");
    }
  };

  return (
    <>
      {userToken ? (
        <View style={styles.reviewForm}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#FFF"
            onChangeText={(text) => setReviewTitle(text)}
            value={reviewTitle}
          />
          <TextInput
            style={[styles.input, styles.commentInput]}
            placeholder="Write your review"
            placeholderTextColor="#FFF"
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => setReviewComment(text)}
            value={reviewComment}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              handleReviewSubmit({ userToken });
            }}
          >
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.reviewForm}>
          <TouchableOpacity
            style={styles.callToSign}
            onPress={() =>
              navigation.navigate("UserStackNavigator", { screen: "SignIn" })
            }
          >
            <Text style={styles.callToSignText}>
              Sign in to leave a review !
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.reviewsContainer}>
        <Text style={styles.reviewsTitle}>Reviews:</Text>
        {reviews.length === 0 && (
          <Text style={styles.noReviews}>No reviews yet.</Text>
        )}
        {reviews.map((review) => {
          return (
            <View key={review._id} style={styles.review}>
              <Text style={styles.reviewTitle}>{review.title}</Text>
              <Text style={styles.reviewComment}>{review.comment}</Text>
              <View style={styles.reviewVotes}>
                <TouchableOpacity
                  style={styles.voteButton}
                  onPress={() =>
                    userToken
                      ? handleUpvote(review._id, { userToken })
                      : navigation.navigate("UserStackNavigator", {
                          screen: "SignIn",
                        })
                  }
                >
                  <Text style={styles.voteButtonText}>↑ {review.upvotes}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.voteButton}
                  onPress={() =>
                    userToken
                      ? handleDownvote(review._id, { userToken })
                      : navigation.navigate("UserStackNavigator", {
                          screen: "SignIn",
                        })
                  }
                >
                  <Text style={styles.voteButtonText}>
                    ↓ {review.downvotes}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  reviewForm: {
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 3,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#000",
    borderColor: "#FFF",
    borderWidth: 2,
    padding: 10,
    borderRadius: 3,
    marginBottom: 10,
    color: "#FFF",
  },
  commentInput: {
    height: 80,
  },
  submitButton: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 3,
  },
  submitButtonText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  callToSign: {
    height: 80,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  callToSignText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  reviewsContainer: {
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 3,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  noReviews: {
    color: "#FFF",
    fontStyle: "italic",
    textAlign: "center",
  },
  review: {
    backgroundColor: "#000",
    borderColor: "white",
    borderWidth: 3,
    padding: 10,
    borderRadius: 3,
    marginBottom: 10,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  reviewComment: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 10,
  },
  reviewVotes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  voteButton: {
    backgroundColor: "#FFF",
    borderColor: "#000",
    padding: 7,
    borderRadius: 3,
  },
  voteButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
});
