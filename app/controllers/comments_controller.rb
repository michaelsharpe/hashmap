class CommentsController < ApplicationController
  before_filter :load_geomarker

  def create
    @comment = @geomarker.comments.build(comment_params)
    @comment.user_id = current_user.id

    respond_to do |format|
      if @comment.save
        format.html
        format.js
      else
        format.html
        format.js
      end
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:content, :geomarker_id)
  end

  def load_geomarker
    @geomarker = Geomarker.find(params[:geomarker_id])
  end
end
