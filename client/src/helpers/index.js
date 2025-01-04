export const countComment = (post, allComments) => {
  let totalComments = 0;

  // Helper function to count comments recursively
  function countComments(commentID) {
    totalComments++;
    let comment = allComments.find((c) => c._id === commentID);
    if (comment && comment.commentIDs.length > 0) {
      comment.commentIDs.forEach((nestedCommentID) => {
        countComments(nestedCommentID);
      });
    }
  }
  post.commentIDs.forEach((commentID) => {
    countComments(commentID);
  });

  return totalComments;
};

export function searchKeywords(root, keywordArr, allComments) {
  return root["commentIDs"].some((id) => {
    let comment = allComments.find((c) => c._id === id);

    const contentMatch = comment.content
      .toLowerCase()
      .split(" ")
      .some((value) => keywordArr.includes(value));

    if (contentMatch) {
      return true;
    }

    if (comment["commentIDs"].length > 0) {
      return searchKeywords(comment, keywordArr, allComments);
    }
    // No match found
    return false;
  });
}

export function sort_posts_date_newest(posts) {
  let p_date_new = posts.slice();
  p_date_new.sort((post1, post2) => {
    return Date.parse(post2.postedDate) - Date.parse(post1.postedDate);
  });
  return p_date_new;
}

export function sort_posts_date_oldest(posts) {
  let p_date_old = posts.slice();
  p_date_old.sort((post1, post2) => {
    return Date.parse(post1.postedDate) - Date.parse(post2.postedDate);
  });
  return p_date_old;
}

export function sort_posts_date_active(posts, allComments) {
  // Helper function to find the most recent comment date for a given post or comment.
  function findMostRecentCommentDate(root) {
    let maxDate = -1; // Initialize with -1 to represent no comments.

    // Iterate through each comment ID associated with the root.
    root.commentIDs.forEach((commentID) => {
      // Find the comment object from allComments.
      let comment = allComments.find((c) => c._id === commentID);

      // Update maxDate if this comment is more recent.
      if (Date.parse(comment.commentedDate) > maxDate) {
        maxDate = Date.parse(comment.commentedDate);
      }
      // recursively do this on the nested comments
      if (comment.commentIDs.length > 0) {
        let nestedMaxDate = findMostRecentCommentDate(comment);
        if (nestedMaxDate > maxDate) {
          maxDate = nestedMaxDate;
        }
      }
    });
    return maxDate;
  }

  let sorted_posts = posts.slice();

  sorted_posts.sort((p1, p2) => {
    if (p1.commentIDs.length === 0) {
      return 1;
    }
    if (p2.commentIDs.length === 0) {
      return -1;
    }
    if (findMostRecentCommentDate(p1) === findMostRecentCommentDate(p2)) {
      return p2.postedDate - p1.postedDate;
    }
    return findMostRecentCommentDate(p2) - findMostRecentCommentDate(p1);
  });

  return sorted_posts;
}

export function format_time(post_time) {
  post_time = new Date(post_time);
  const present_time = new Date();
  const hour = 24;
  const minute = 60;
  const second = 60;
  const day_in_minute = hour * minute;
  const day_in_second = day_in_minute * second;
  const day_in_month = 30; // have to fix both
  const day_in_year = 365;

  const dif_in_sec = Math.floor((present_time - post_time) / 1000);
  const second_ago = Math.floor(dif_in_sec);
  const min_ago = Math.floor(dif_in_sec / minute);
  const hour_ago = Math.floor(dif_in_sec / (minute * hour));
  const day_ago = Math.floor(dif_in_sec / day_in_second);
  const month_ago = Math.floor(day_ago / day_in_month);
  const year_ago = Math.floor(day_ago / day_in_year);

  if (dif_in_sec < second) {
    // second ago
    return `${second_ago} seconds ago`;
  } else if (dif_in_sec < day_in_second) {
    // mins ago
    return `${min_ago} minutes ago`;
  } else if (dif_in_sec < day_in_minute) {
    // hour ago
    return `${hour_ago} hour(s) ago`;
  } else if (day_ago < day_in_month) {
    // days ago
    return `${day_ago} day(s) ago`;
  } else if (day_ago < day_in_year) {
    // months ago
    return `${month_ago} month(s) ago`;
  } else {
    // years ago
    return `${year_ago} year(s) ago`;
  }
}
