<div class="comment-box" style="display:none;">

    <div class="header p-s"><?php echo e(trans('entities.comment_new')); ?></div>
    <div refs="page-comments@replyToRow" class="reply-row primary-background-light text-muted px-s py-xs mb-s" style="display: none;">
        <div class="grid left-focus v-center">
            <div>
                <?php echo trans('entities.comment_in_reply_to', ['commentId' => '<a href=""></a>']); ?>

            </div>
            <div class="text-right">
                <button class="text-button" action="remove-reply-to"><?php echo e(trans('common.remove')); ?></button>
            </div>
        </div>
    </div>

    <div refs="page-comments@formContainer" class="content px-s">
        <form novalidate>
            <div class="form-group description-input">
                        <textarea name="markdown" rows="3"
                                  placeholder="<?php echo e(trans('entities.comment_placeholder')); ?>"></textarea>
            </div>
            <div class="form-group text-right">
                <button type="button" class="button outline"
                        action="hideForm"><?php echo e(trans('common.cancel')); ?></button>
                <button type="submit" class="button"><?php echo e(trans('entities.comment_save')); ?></button>
            </div>
            <div class="form-group loading" style="display: none;">
                <?php echo $__env->make('common.loading-icon', ['text' => trans('entities.comment_saving')], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
            </div>
        </form>
    </div>

</div><?php /**PATH /var/www/bookstack/resources/views/comments/create.blade.php ENDPATH**/ ?>